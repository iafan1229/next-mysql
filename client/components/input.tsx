interface inputTypes {
	text: string;
	type: string;
	placeholder?: string;
	value: string;
	setValue: (str: string) => void;
	error?: string;
}
export default function Input({
	text,
	type,
	placeholder,
	value,
	setValue,
	error,
}: inputTypes) {
	return (
		<div className='input-wrap'>
			<span>{text}</span>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<span>{error}</span>
		</div>
	);
}
