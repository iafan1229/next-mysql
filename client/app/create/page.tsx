'use client';
import Input from '@/components/input';
import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthDispatch, useAuthState } from '@/context/auth';

export default function CreateCommunity() {
	const { authenticated } = useAuthState();
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [error, setError] = useState<any>({});
	const [desc, setDesc] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/subs', { name, title, desc });

			if (res) {
				console.log(res);
				if (res.data.name) router.push(`/community/${res.data.name}`);
			}
		} catch (err: any) {
			console.log(err);
			setError(err.response.data);
		}
	};
	useEffect(() => {
		if (!authenticated) {
			router.push('/');
		}
	}, []);
	return (
		<>
			<h1>커뮤니티 만들기</h1>
			<hr />
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<Input
						text='커뮤니티 이름'
						value={name}
						setValue={setName}
						type='text'
						error={error.name}
					/>
					<p>커뮤니티 이름은 영문만 가능하며, 다시 변경할 수 없습니다.</p>
				</div>
				<div>
					<Input
						text='커뮤니티 주제'
						value={title}
						setValue={setTitle}
						type='text'
						error={error.title}
					/>
					<p>커뮤니티 주제는 언제든지 변경 가능합니다.</p>
				</div>
				<div>
					<Input
						text='커뮤니티 설명'
						value={desc}
						setValue={setDesc}
						type='text'
						error={error.desc}
					/>
				</div>
				<div>
					<input type='submit' value='커뮤니티 만들기' />
				</div>
			</form>
		</>
	);
}
