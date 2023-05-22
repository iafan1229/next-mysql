import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import cors from 'cors';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const origin = 'http://localhost:3000';

const app = express();

//클라이언트에서 보내는 메시지를 분석(body-parser)
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin,
	})
);
//라우터
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
