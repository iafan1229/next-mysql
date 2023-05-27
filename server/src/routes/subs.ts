import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from '../../utils/prisma';
import userMiddleWare from '../../middlewares/user';
import authMiddleWare from '../../middlewares/auth';

async function createPostWithTitle(
	name: string,
	title: string,
	desc: string,
	user: any
) {
	const community = await prisma.subs.create({
		data: {
			name: name,
			title: title,
			description: desc,
			user: {
				connect: { id: user.id },
			},
		},
	});
	return community;
}

const findSub = async (name: string) => {
	return await prisma.subs.findFirst({
		where: {
			name: name,
		},
	});
};
const createSub = async (req: Request, res: Response) => {
	const { name, title, desc } = req.body;
	try {
		const user = res.locals.user;
		let errors: any = {};
		if (!name.length) errors.name = '이름은 비워둘 수 없습니다';
		if (!title.length) errors.title = '제목은 비워둘 수 없습니다.';

		if (await findSub(name)) errors.name = '이미 커뮤니티가 존재합니다.';

		if (Object.keys(errors).length > 0) {
			throw errors;
		}
		await createPostWithTitle(name, title, desc, user)
			.then((createdPost) => {
				console.log('게시물이 생성되었습니다:', createdPost);
				res.status(200).json({ name: createdPost.name });
			})
			.catch((error) => {
				console.error('게시물 생성 중 오류가 발생했습니다:', error);
				res.status(400).json(error);
			})
			.finally(() => {
				prisma.$disconnect();
			});
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const topSubs = async (_: Request, res: Response) => {
	try {
		//const imageUrl = 'https://www.gravatar.com/avatar?d=mp&f=y';
		const subs = await prisma.subs.findMany({
			// include: {
			// 	comments: true,
			// },
			orderBy: {
				createdAt: 'desc',
			},
			take: 5,
		});

		return res.json(subs);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'wrong' });
	}
};

const getSub = async (req: Request, res: Response) => {
	const name = req.params.name;
	try {
		const sub = await prisma.subs.findFirst({
			where: {
				name: name,
			},
		});
		console.log(sub);
		return res.status(200).json(sub);
	} catch (err) {
		return res.status(404).json({ error: '커뮤니티를 찾을수없음' });
	}
};
const router = Router();

router.post('/', userMiddleWare, authMiddleWare, createSub);
router.get('/sub/topSubs', topSubs);
router.get('/:name', userMiddleWare, getSub);
export default router;
