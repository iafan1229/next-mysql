'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/navigation';
import Input from '@/components/input';
import Temp from '@/components/temp';
import Login from './login/page';
import { useQuery } from 'react-query';

export default function Home() {
	const [condition, setCondition] = useState('/');
	const {
		data: topSubs,
		error,
		isLoading,
	} = useQuery(['getList'], async () => {
		// getPost는 idx값을 받아서 Post 데이터를 가져오는 API
		const data = await axios.get('http://localhost:3000/api/subs/sub/topSubs');
		return data;
	});
	console.log(topSubs);
	return (
		<>
			<section className='community'>
				<article className='content'></article>
				<article className='list'>
					<h2>상위 커뮤니티 TOP 5</h2>
					<ul className='topSubs'>
						{topSubs?.data.map((sub: any, idx: number) => {
							return (
								<>
									<li>
										<h3>{idx + 1}위</h3>
										<p>url - {`/community/${sub.name}`}</p>
										<p>title - {sub.title}</p>
									</li>
								</>
							);
						})}
					</ul>
				</article>
			</section>
		</>
	);
}
