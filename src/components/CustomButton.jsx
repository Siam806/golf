import React from "react";

export default function CustomButton({ text, type, name, onClick, styles }) {
	return (
		<>
			<button type={type} onClick={onClick} name={name} className={"mt-2 text-xs text-white px-4 py-2 rounded font-bold active:bg-white/10 hover:bg-white/20 " + styles}>
				{text}
			</button>
		</>
	);
}
