'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
	const [on, setOn] = useState(0);
	const menu = [
		{ 홈: '/' },
		{ 로그인: '/login' },
		{ 회원가입: '/join' },
		{ 커뮤니티생성: '/create' },
	];

	return (
		<header>
			<ul>
				<li>
					<h4>COMMUNITY</h4>
				</li>
				{menu.map((item, idx) => {
					const key = Object.keys(item)[0]; // 키 값을 가져옵니다
					const value = item[key]; // 값을 가져옵니다

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
