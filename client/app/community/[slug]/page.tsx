'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';

interface subType {
	data: {
		id: string;
		createdAt?: Date;
		updatedAt?: Date;
		name: string;
		title: string;
		description: string;
		imageUrn?: string;
		bannerUrn?: string;
	};
}

export default function Community() {
	const { slug } = useParams();
	const {
		data: sub,
		error,
		isLoading,
	} = useQuery(['getCommunity', slug], async () => {
		// getPost는 idx값을 받아서 Post 데이터를 가져오는 API
		const data: subType = await axios.get(
			`http://localhost:3000/api/subs/${slug}`
		);
		return data;
	});
	console.log(sub);
	return (
		<div className='community-detail'>
			<div className='banner'>
				{sub?.data?.bannerUrn ? (
					<div>배너있음</div>
				) : (
					<div className='no-banner'></div>
				)}
				<div className='url'>
					<p>/community/{sub?.data?.name}</p>
				</div>
			</div>

			<div className='content'>
				<div className='left'></div>
				<div className='right'>
					<div className='intro'>
						<h3>커뮤니티에 대해서</h3>
					</div>
					<div className='detail'>
						<p>커뮤니티명: {sub?.data?.name}</p>
						<p>
							생성날짜:{' '}
							{`${
								sub?.data?.updatedAt
									?.toLocaleString('ko-KR', {
										timeZone: 'Asia/Seoul',
									})
									.split('T')[0]
							}, ${
								sub?.data?.updatedAt
									?.toLocaleString('ko-KR', {
										timeZone: 'Asia/Seoul',
									})
									.split('T')[1]
									.split('.')[0]
							}`}
						</p>
						<button>포스트 생성</button>
					</div>
				</div>
			</div>
		</div>
	);
}
