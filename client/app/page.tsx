'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
	const [test, setTest] = useState('');
	useEffect(() => {
		const data = axios('/api/data').then((res) => setTest(res.data.message));
	}, []);
	return <main>{test}</main>;
}
