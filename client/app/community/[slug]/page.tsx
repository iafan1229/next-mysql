'use client';

import { ChangeEvent, useRef, useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import { useAuthState } from '@/context/auth';
import Input from '@/components/input';
import Post from '@/components/post';

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
interface arrayType {
	title: string;
	body: string;
	userName: string;
	identifier: string;
	slug: string;
	createdAt: null | string;
	updatedAt: string;
}
interface PostType {
	data: arrayType[];
}

export default function Community() {
	const [createPosts, setCreatePosts] = useState(false);
	const [ownSub, setOwnSub] = useState(false);
	const [name, setName] = useState<string>('');
	const { authenticated, user } = useAuthState();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { slug, identifier } = useParams();
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

	const { data: post } = useQuery(['getPosts', slug], async () => {
		// getPost는 idx값을 받아서 Post 데이터를 가져오는 API
		const data: PostType = await axios.get(
			`http://localhost:3000/api/posts/${slug}`
		);
		return data;
	});

	console.log(post);

	const [postName, setPostName] = useState('');
	const [postError, setPostError] = useState<any>({});
	const [desc, setDesc] = useState('');

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
	const createPost = () => {
		setCreatePosts(!createPosts);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (postName.trim() === '' || !sub?.data) return;
		try {
			const data = await axios.post('/api/posts', {
				postName: postName.trim(),
				desc,
				sub: sub.data.name,
			});
			if (data) {
				alert('글 성공적으로 작성됨');
				console.log(data);
				setCreatePosts(false);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (!sub?.data || !user?.name) return;
		setOwnSub(authenticated && user?.name === sub.data.userName);
	}, [sub, user, authenticated]);

	return (
		<div className='community-detail'>
			{createPosts && (
				<div className='create-post'>
					<form action='' onSubmit={(e) => handleSubmit(e)}>
						<span className='close' onClick={() => setCreatePosts(false)}>
							<img src='/common/close.png' alt='닫기' />
						</span>
						<Input
							text='포스트 이름'
							value={postName}
							setValue={setPostName}
							type='text'
							placeholder='Title'
							error={postError.name}
						/>
						<Input
							text='포스트 설명'
							value={desc}
							setValue={setDesc}
							type='text'
							placeholder='description'
							error={postError.desc}
						/>
						<button type='submit'>포스트 생성</button>
					</form>
				</div>
			)}
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
				<div className='left'>
					{post?.data.map((el, idx) => {
						return (
							<Post
								key={idx}
								title={el.title}
								body={el.body}
								userName={el.identifier}
								updatedAt={el.updatedAt}
							/>
						);
					})}
				</div>
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
						<button onClick={createPost}>포스트 생성</button>
					</div>
				</div>
			</div>
		</div>
	);
}
