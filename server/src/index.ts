import express from "express";
import morgan from "morgan";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

//클라이언트에서 보내는 메시지를 분석(body-parser)
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

async function createUser(name:string, email:string, phoneNumber:string, age:number) {
	const user = await prisma.user.create({
		data: {
			name,
			email,
			phoneNumber,
			age,
		},
	});

	return user;
}

// 사용 예시
async function main() {
	const newUser = await createUser(
		'John Doe',
		'john@example.com',
		'01012345678',
		32
	);
	console.log('Created user:', newUser);
}

app.get('/api/data', async (req, res) => {
	const user = await prisma.user.findFirst({
		where: {
			name: 'John Doe',
		},
	});
	try {
		const responseData = {
			message: user.name,
		};
		res.json(responseData);
	} catch (error) {
		console.error('API 요청 중 오류가 발생했습니다:', error);
		res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다' });
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
