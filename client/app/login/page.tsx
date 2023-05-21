'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/input';

export default function Login() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	return (
		<div>
			<Input value={name} setValue={setName} type='text' />
		</div>
	);
}
