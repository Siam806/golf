import React from "react";

export default function CustomButton({ text, type, onClick, styles }) {
	return (
		<>
			{/* <button type={type} onClick={onClick} className={"mt-5 border-2 bg-gray-700 px-4 py-2 rounded-2xl active:bg-gray-600 "}> */}
			<button type={type} onClick={onClick} className={"mt-2 text-xs text-white px-4 py-2 rounded font-bold " + styles}>
				{text}
			</button>
		</>
	);
}
