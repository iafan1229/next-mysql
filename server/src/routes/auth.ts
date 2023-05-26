import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from '../../utils/prisma';
import userMiddleWare from '../../middlewares/user';
import authMiddleWare from '../../middlewares/auth';

const hashPassword = async (pw: string) => {
	const password = await bcrypt.hash(pw, 6);
	return password;
};

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

const isEmpty = (el: string) => {
	if (el.length) {
		return false;
	} else {
		return true;
	}
};

/**
 *
 * @param req 로그인 api 요청
 * @param res 로그인 api 응답
 * @returns user, token
 */
const login = async (req: Request, res: Response) => {
	const { email, pw } = req.body;
	try {
		let errors: any = {};
		if (isEmpty(email)) errors.email = '사용자 이름은 비워둘 수 없습니다';
		if (isEmpty(pw)) errors.pw = '비밀번호는 비워둘 수 없습니다';
		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}

		const user = await prisma.user.findFirst({ where: { email: email } });

		if (!user)
			return res
				.status(404)
				.json({ email: '사용자 이름이 등록되지 않았습니다' });

		const passwordMatches = await bcrypt.compare(pw, user.pw);
		if (passwordMatches === false) {
			return res.status(401).json({ pw: '비밀번호가 틀림' });
		}
		const token = Jwt.sign({ email }, process.env.JWT_SECRET!);
		res.set(
			'Set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict',
			})
		);

		return res.json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

/**
 *
 * @param req 회원가입 요청
 * @param res 회원가입 응답
 * @returns '데이터 저장에 성공'
 */
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

		const newUser = await createUser(name, email, await hashPassword(pw));
		console.log('Created user:', newUser);
		if (newUser) {
			res.status(200).json({ success: '데이터 저장에 성공' });
		}
	} catch (error) {
		console.error('API 요청 중 오류가 발생했습니다:', error);
		res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다' });
	}
};

const me = async (_: Request, res: Response) => {
	return res.json(res.locals.user);
};
const logout = async (_: Request, res: Response) => {
	res.set(
		'Set-Cookie',
		cookie.serialize('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			expires: new Date(0),
			path: '/',
		})
	);
	res.status(200).json({ success: true });
};

const router = Router();
router.get('/me', userMiddleWare, authMiddleWare, me);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', userMiddleWare, authMiddleWare, logout);

export default router;
