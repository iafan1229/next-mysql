import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { prisma } from '../utils/prisma';

export default async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		//요청의 쿠키에 담겨 있는 토큰을 가져오기
		const token = request.headers.getcookie as string;
		console.log('리퀘스트의 헤더를 한번 볼까?');
		console.log(token);
		if (!token) return next();

		//토큰 Decode
		const { email }: any = jwt.verify(token, process.env.JWT_SECRET!);

		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		//유저 정보를 res.local.user에 넣어주기
		response.locals.user = user;
		return next();
	} catch (error) {
		console.log(error);
		return response.status(400).json({ error: 'wrong' });
	}
};
