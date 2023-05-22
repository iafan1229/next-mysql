import { Request, Response, Router } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(name: string, email: string, pw: string) {
	const user = await prisma.user.create({
		data: {
			name,
			email,
			pw,
		},
	});

	return user;
}

const register = async (req: Request, res: Response) => {
	const { email, name, pw } = req.body;
	console.log(email, name, pw);

	try {
		let errors: any = {};

		const emailUser = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		console.log('유저의 이메일이 있는지 없는지 확인: ');
		console.log(emailUser);

		const nameUser = await prisma.user.findFirst({
			where: {
				name: name,
			},
		});
		if (emailUser) errors.email = '이미 해당 이메일주소가 사용됨';
		if (nameUser) errors.name = '이미 해당 사용자 이름이 사용됨';

		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}

		const newUser = await createUser(name, email, pw);
		console.log('Created user:', newUser);
		if (newUser) {
			res.status(200).json({ success: '데이터 저장에 성공' });
		}
	} catch (error) {
		console.error('API 요청 중 오류가 발생했습니다:', error);
		res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다' });
	}
};

const router = Router();

router.post('/register', register);

export default router;
