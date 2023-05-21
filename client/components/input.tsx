import { useEffect, useState } from 'react';

interface inputTypes {
	type: string;
	placeholder?: string;
	value: string;
	setValue: (str: string) => void;
	error?: string;
}
export default function Input({
	type,
	placeholder,
	value,
	setValue,
	error,
}: inputTypes) {
	return (
		<div>
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
