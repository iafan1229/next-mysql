interface PostType {
	title: string;
	body: string;
	userName: string;
	updatedAt: string;
}
export default function Post({ title, body, userName, updatedAt }: PostType) {
	return (
		<div className='each-post'>
			<h1>{title}</h1>
			<p className='body'>{body}</p>
			<p>작성자: {userName}</p>
			<p>생성 날짜: {updatedAt}</p>
		</div>
	);
}
