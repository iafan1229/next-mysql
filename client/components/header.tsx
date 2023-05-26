'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState, useAuthDispatch } from '@/context/auth';
import axios from 'axios';

export default function Header() {
	const { authenticated } = useAuthState();
	const dispatch = useAuthDispatch();
	const [on, setOn] = useState(0);
	const menu = [
		{ 홈: '/' },
		{ 로그인: '/login' },
		{ 회원가입: '/join' },
		{ 커뮤니티생성: '/create' },
	];
	const handleLogout = () => {
		axios
			.post('/api/auth/logout')
			.then((res) => {
				dispatch('LOGOUT');
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};
	return (
		<header>
			<ul>
				<li>
					<h4>COMMUNITY</h4>
				</li>
				{authenticated && (
					<li className='logout'>
						<button onClick={handleLogout}>로그아웃</button>
					</li>
				)}
				{menu.map((item, idx) => {
					const key = Object.keys(item)[0]; // 키 값을 가져옵니다
					const value = item[key]; // 값을 가져옵니다
					if (authenticated && key === '회원가입') return;
					return (
						<li
							key={idx}
							onClick={() => setOn(idx)}
							className={on === idx ? 'on' : ''}>
							<Link href={value}>{key}</Link>
						</li>
					);
				})}
			</ul>
		</header>
	);
}
