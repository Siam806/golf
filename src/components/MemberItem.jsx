import React from "react";

export default function MemberItem({ member, index }) {
	return (
		<div className="flex gap-5 items-center justify-between my-4 text-[14px] mr-4">
			<div className={`flex-1 flex flex-row justify-between gap-5 border border-gray-300 p-5 rounded-lg text-nowrap overflow-x-auto  ${index % 2 == 0 ? "bg-gray-700/80" : ""}`}>
				<span>🧑 {member.userName}</span>
				<span>⛳ {50}</span>
				<span>📧 {member.userEmail}</span>
			</div>
			<button className="bg-green-500 text-white/90 p-2 rounded-lg hover:bg-green-700">
				<span className="material-icons">edit</span>
			</button>
		</div>
	);
}
