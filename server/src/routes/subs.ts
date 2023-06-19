import { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from '../../utils/prisma';
import userMiddleWare from '../../middlewares/user';
import authMiddleWare from '../../middlewares/auth';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface subType {
	name: string;
	title: string;
	desc: string;
	user: any;
	imageUrn: string | null;
	userName: string;
}

async function createSubCommunity(
	name: string,
	title: string,
	desc: string,
	user: any,
	imageUrn: string | null
) {
	const community = await prisma.subs.create({
		data: {
			name: name,
			title: title,
			description: desc,
			imageUrn: imageUrn ?? 'https://www.gravatar.com/avatar?d=mp&f=y',
			userName: user.name,
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
		const imageUrn = null;
		let errors: any = {};
		if (!name.length) errors.name = '이름은 비워둘 수 없습니다';
		if (!title.length) errors.title = '제목은 비워둘 수 없습니다.';

		if (await findSub(name)) errors.name = '이미 커뮤니티가 존재합니다.';

		if (Object.keys(errors).length > 0) {
			throw errors;
		}
		await createSubCommunity(name, title, desc, user, imageUrn)
			.then((created) => {
				console.log('커뮤니티가 생성되었습니다:', created);
				res.status(200).json({ name: created.name });
			})
			.catch((error) => {
				console.error('커뮤니티 생성 중 오류가 발생했습니다:', error);
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

		return res.status(200).json(sub);
	} catch (err) {
		return res.status(404).json({ error: '커뮤니티를 찾을수없음' });
	}
};

const ownSub = async (req: Request, res: Response, next: NextFunction) => {
	console.log('프론트에서 받은 request' + req.body.userName);
	const user = res.locals.user;
	console.log(user.name);
	try {
		const sub: subType = await prisma.subs.findFirst({
			where: { userName: req.body.userName },
		});
		if (sub.userName !== user.name) {
			return res
				.status(403)
				.json({ error: '이 커뮤니티를 소유하고 있지 않습니다' });
		}
		res.locals.sub = sub;
		return next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: '문제 발생' });
	}
};
function makeId(el: number) {
	const timestamp = Date.now().toString(); // 현재 타임스탬프
	const randomChars = Math.random().toString(el).substr(2, 5); // 무작위 문자열
	return `${timestamp}_${randomChars}`;
}
const storage = multer.diskStorage({
	destination: '../client/public/images',
	filename: (_, file, callback) => {
		const name = makeId(15);
		callback(null, name + path.extname(file.originalname));
	},
});

const upload = multer({
	storage,
	fileFilter: (_, file, callback) => {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			callback(null, true);
		} else {
			callback(new Error('이미지가 아닙니다'));
		}
	},
});
const uploadSubImage = async (req: Request, res: Response) => {
	const sub = res.locals.sub;
	const user = res.locals.user;
	try {
		const type = req.body.type;
		//파일 유형 지정치 않았을 때에는 업로드 된 파일 삭제
		if (type !== 'image' && type !== 'banner') {
			if (!req.file?.path) {
				return res.status(400).json({ error: '유효하지 않은 파일' });
			}
			//multer에 의해 캡슐화된 파일 객체에는 파일 경로가 있기 때문에
			//dirname/pwpd가 자동으로 추가된다.
			fs.unlinkSync(req.file.path);
			return res.status(400).json({ error: '잘못된 유형' });
		}
		let oldImageUrn: string = '';

		if (type === 'image') {
			//사용중인 Urn을 저장함(이전파일을 아래서 삭제하기 위해서)
			oldImageUrn = sub.imageUrn || '';
			//'새로운 파일 이름'을 Urn으로 넣어준다.
			sub.imageUrn = req.file?.filename || '';
		}

		const createImage = await prisma.subs.update({
			where: { id: sub.id },
			data: {
				imageUrn: req.file?.filename, // 새로운 이미지 파일 경로 또는 값을 설정합니다.
			},
		});
		if (oldImageUrn !== '') {
			console.log('파일을 볼까' + oldImageUrn);

			const fullFileName = path.resolve(
				process.cwd(),
				'public',
				'images',
				oldImageUrn
			);
			fs.unlinkSync(fullFileName);
		}

		return res.json(createImage);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong' });
	}
};

const router = Router();

router.post('/', userMiddleWare, authMiddleWare, createSub);
router.get('/sub/topSubs', topSubs);
router.get('/:name', userMiddleWare, authMiddleWare, getSub);
router.post(
	'/:name/upload',
	userMiddleWare,
	authMiddleWare,
	ownSub,
	upload.single('file'),
	uploadSubImage
);

export default router;
