import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// 외부 폴더 경로 설정
	const externalFolderPath = '../../server/public/images'; // 외부 폴더의 실제 경로로 수정해야 합니다

	// 클라이언트로부터 요청된 파일명
	const fileName = req.query.fileName as string;

	// 외부 폴더 내 파일의 실제 경로
	const filePath = path.join(externalFolderPath, fileName);

	// 파일이 존재하는지 확인
	if (fs.existsSync(filePath)) {
		// 파일이 존재하는 경우, 해당 파일을 스트림으로 읽어 클라이언트에 전송
		fs.createReadStream(filePath).pipe(res);
	} else {
		// 파일이 존재하지 않는 경우, 404 응답 반환
		res.status(404).end();
	}
}
