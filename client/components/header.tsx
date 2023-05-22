import Link from 'next/link';

export default function Header() {
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
					{menu.map((item, idx) => {
						const key = Object.keys(item)[0]; // 키 값을 가져옵니다
						const value = item[key]; // 값을 가져옵니다

						return (
							<Link href={value} key={idx}>
								{key}
							</Link>
						);
					})}
				</li>
			</ul>
		</header>
	);
}
