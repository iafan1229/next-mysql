'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Input from '@/components/input';
import Header from '@/components/header';
import Temp from '@/components/temp';
import Login from './login/page';

export default function Home() {
	const [condition, setCondition] = useState('/');
	// useEffect(() => {
	// 	const data = axios('/api/data').then((res) => setTest(res.data.message));
	// }, []);
	return (
		<main>
			<Header setCondition={setCondition} />
			<div>
				{condition === '/' && <Temp />}
				{condition === '/login' && <Login />}
			</div>
		</main>
	);
}
