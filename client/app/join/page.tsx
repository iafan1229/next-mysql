'use client';

import { FormEvent, useEffect, useState, use } from 'react';
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
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [error, setError] = useState<errorType>({});
	// const isLogged = await getData();

	// console.log(isLogged);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post('/api/auth/register', {
				name,
				email,
				pw,
			});
			console.log(res);
			router.push('/');
		} catch (err: any) {
			console.log(err);
			setError(err?.response?.data || {});
		}
	};

	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<Input
					text='이름'
					value={name}
					setValue={setName}
					type='text'
					error={error.name}
				/>
				<Input
					text='이메일주소'
					placeholder='이메일주소를 입력하세요.'
					value={email}
					setValue={setEmail}
					type='text'
					error={error.email}
				/>
				<Input text='비밀번호' value={pw} setValue={setPw} type='password' />
				<input type='submit' value='회원가입' />
			</form>
		</>
	);
}
