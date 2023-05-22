'use client';

import { FormEvent, useEffect, useState } from 'react';
import Input from '@/components/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface errorType {
	name?: string;
	email?: string;
	pw?: string;
}

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [err, setErr] = useState<errorType>({});
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
		} catch (err: any) {
			console.log(err);
			setErr(err?.response?.data || {});
		}
	};
	return (
		<>
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
				<input type='submit' value='회원가입' />
			</form>
		</>
	);
}
