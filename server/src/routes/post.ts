import { prisma } from '../../utils/prisma';
import { Request, Response, Router } from 'express';
import userMiddleWare from '../../middlewares/user';
import authMiddleWare from '../../middlewares/auth';

const createPost = async (req: Request, res: Response) => {
	const { postName, desc, sub } = req.body;
	if (postName.trim() === '')
		return res.status(400).json({ title: '제목은 비워둘 수 없습니다' });

	const user = res.locals.user;
	console.log(user);
	try {
		const subRecord = await prisma.subs.findFirst({
			where: {
				name: sub,
			},
		});

		const post = await prisma.post.create({
			data: {
				title: postName,
				body: desc,
				identifier: user.name,
				slug: postName.toLowerCase(),
				sub: {
					connect: {
						id: subRecord.id,
					},
				},

				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});
		return res.json(post);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: '문제 발생함' });
	}
};

const getPost = async (req: Request, res: Response) => {
	const { slug } = req.params;
	try {
		const post = await prisma.post.findMany({
			where: {
				slug,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		return res.send(post);
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
	}
};
const router = Router();

router.post('/', userMiddleWare, authMiddleWare, createPost);
router.get('/:identifier', userMiddleWare, getPost);
export default router;
