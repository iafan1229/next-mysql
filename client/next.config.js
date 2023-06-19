/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['www.gravatar.com', 'localhost'],
	},
	async headers() {
		return [
			{
				source: '/api/:path*', // 프록시할 API 엔드포인트 경로
				headers: [
					{ key: 'cz-shortcut-listen', value: 'value' }, // 에러를 없애기 위해 추가한 헤더
				],
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*', // 프록시할 API 엔드포인트 경로
				destination: 'http://localhost:5000/api/:path*', // 실제 API 서버 주소
			},
		];
	},
};

module.exports = nextConfig;
