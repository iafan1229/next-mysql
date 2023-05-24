import { NextFunction, Response, Request } from 'express';
import { prisma } from '../utils/prisma';

export default async (_: Request, response: Response, next: NextFunction) => {
	try {
		const user = response.locals.user;
		if (!user) throw new Error('unauthenticated');

		return next();
	} catch (err) {
		console.log(err);
		return response.status(401).json({ error: 'unauthenticated' });
	}
};
