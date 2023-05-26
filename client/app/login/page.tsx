'use client';

import { FormEvent, useEffect, useState } from 'react';
import Input from '@/components/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthDispatch, useAuthState } from '@/context/auth';

interface errorType {
	name?: string;
	email?: string;
	pw?: string;
}

export default function Login() {
	const { authenticated } = useAuthState();
	const dispatch = useAuthDispatch();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [err, setErr] = useState<errorType>({});

	useEffect(() => {
		if (authenticated) router.push('/');
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'/api/auth/login',
				{
					email,
					pw,
				},
				{
					withCredentials: true,
				}
			);
			console.log(res);
			if (res) {
				dispatch('LOGIN', res.data?.user);
				router.push('/');
			}
		} catch (err: any) {
			console.log(err);
			setErr(err?.response?.data || {});
		}
	};
	return (
		<>
			<h1>로그인</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<Input
					text='이메일주소'
					placeholder='이메일주소를 입력하세요.'
					value={email}
					setValue={setEmail}
					type='text'
					error={err.email}
				/>
				<Input text='비밀번호' value={pw} setValue={setPw} type='password' />
				<input type='submit' value='로그인' />
			</form>
		</>
	);
}
