import React from "react";

export default function MemberItem({ member }) {
	return (
		<div className="flex items-center justify-between my-4 text-[14px]">
			<div className="flex-1 border border-gray-300 p-5 rounded-lg min-w-[600px]">
				<div className="grid grid-cols-3 gap-0 w-full">
					<span className="text-left w-40">🧑 {member.userName}</span>
					<span className="text-center w-10">⛳ {50}</span>
					<span className="text-right w-0 whitespace-nowrap">📧 {member.userEmail}</span>
				</div>
			</div>
			<button
				className="bg-green-500 p-3 rounded-lg flex items-center justify-center ml-4 hover:bg-green-700"
				aria-label={`edit-${member.userEmail}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="w-4 h-4"
				>
					<path d="M12 20h9" />
					<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
				</svg>
			</button>
		</div>
	);
}
