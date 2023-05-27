'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

export default function Home() {
	const [condition, setCondition] = useState('/');
	const router = useRouter();
	const {
		data: topSubs,
		error,
		isLoading,
	} = useQuery(['getList'], async () => {
		// getPost는 idx값을 받아서 Post 데이터를 가져오는 API
		const data = await axios.get('http://localhost:3000/api/subs/sub/topSubs');
		return data;
	});
	const createCommunity = () => {
		router.push('/create');
	};
	return (
		<>
			<section className='community'>
				<article className='content'></article>
				<article className='list'>
					<h2>상위 커뮤니티 TOP 5</h2>
					<hr />
					<ul className='topSubs'>
						{topSubs?.data.map((sub: any, idx: number) => {
							return (
								<>
									<li>
										<Link href={`/community/${sub.name}`}>
											<h3>{idx + 1}위</h3>
											<p>url - {`/community/${sub.name}`}</p>
											<p>title - {sub.title}</p>
										</Link>
									</li>
								</>
							);
						})}
					</ul>
					<button onClick={createCommunity}>커뮤니티 만들기</button>
				</article>
			</section>
		</>
	);
}
