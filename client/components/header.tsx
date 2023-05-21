import Link from 'next/link';
import { useEffect, useState } from 'react';

interface headerProps {
	setCondition: (str: string) => void;
}
export default function Header({ setCondition }: headerProps) {
	const menu = [
		{ 홈: '/' },
		{ 로그인: '/login' },
		{ 회원가입: '/join' },
		{ 커뮤니티생성: '/create' },
	];
	useEffect(() => {}, []);
	return (
		<header>
			<ul>
				<li>
					{menu.map((item, idx) => {
						const key = Object.keys(item)[0]; // 키 값을 가져옵니다
						const value = item[key]; // 값을 가져옵니다

						return (
							<p key={idx} onClick={() => setCondition(value)}>
								{key}
							</p>
						);
					})}
				</li>
			</ul>
		</header>
	);
}
