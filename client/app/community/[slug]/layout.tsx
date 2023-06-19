import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import axios from 'axios';

export default async function SiteLayout(
	{
		children,
	}: {
		children: React.ReactNode;
	},
	request: NextRequest,
	response: NextResponse
) {
	const result = await getData(request, response);

	if (result) redirect('/');
	return (
		<div>
			<main>{children}</main>
		</div>
	);
}

async function getData(request: NextRequest, response: NextResponse) {
	try {
		// const getCookie = cookies().get('token')?.value;
		// if (!getCookie) throw new Error('Missing auth token cookie');
		// const result = await axios('http://localhost:5000/api/auth/me', {
		// 	headers: { getCookie },
		// });
		// if (result) return true;
	} catch (error) {
		return false;
	}
}
