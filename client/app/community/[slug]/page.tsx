'use client';

import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import { useAuthState } from '@/context/auth';

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
		userName: string;
	};
}

export default function Community() {
	const [ownSub, setOwnSub] = useState(false);
	const [name, setName] = useState<string>('');
	const { authenticated, user } = useAuthState();
	const fileInputRef = useRef<HTMLInputElement>(null);
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

	const uploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files === null) return;
		const file = e.target.files[0];

		const formData = new FormData();
		if (sub?.data) {
			formData.append('file', file);
			formData.append('type', name);
			formData.append('name', sub?.data.userName);
		}

		try {
			await axios.post(`/api/subs/${sub?.data.name}/upload`, formData, {
				headers: { 'Context-Type': 'multipart/form-data' },
			});
		} catch (err: any) {
			console.log(err);
		}
	};
	const openFileInput = (type: string) => {
		if (!ownSub) return alert('유저가 생성한 커뮤니티가 아닙니다');
		const fileinput = fileInputRef.current;
		if (fileinput) {
			setName(type);
			// fileinput.name = type;
			fileinput.click();
		}
	};
	useEffect(() => {
		if (!sub?.data || !user?.name) return;
		setOwnSub(authenticated && user?.name === sub.data.userName);
	}, [sub, user, authenticated]);
	console.log(ownSub);
	return (
		<div className='community-detail'>
			<div className='banner'>
				<p>/community/{sub?.data?.name}</p>
				{sub?.data?.bannerUrn ? (
					<div>배너있음</div>
				) : (
					<div className='no-banner'></div>
				)}
				<div className='url'>
					<span className='url-img'>
						<span>
							<Image
								src={
									'/images/' + sub?.data?.imageUrn ||
									'https://www.gravatar.com/avatar?d=mp&f=y'
								}
								width={150}
								height={150}
								alt='이미지가 나오지 않음'
							/>
						</span>
						<span onClick={() => openFileInput('image')}>
							<Image
								src={`/img/camera.png`}
								alt='프로필 사진 선택'
								width={50}
								height={50}
							/>
						</span>
						<input
							type='file'
							hidden={true}
							ref={fileInputRef}
							onChange={uploadImg}
						/>
					</span>
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
