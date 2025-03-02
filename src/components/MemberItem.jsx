import React from "react";

export default function MemberItem({ member }) {
	return (
		<div className="flex flex-row justify-between my-4 mr-4 text-[14px] border border-gray-300 p-5 rounded-lg">
			<p>🧑 {member.userName}</p>
			<p>🛠 {member.userRole}</p>
			<p>📧 {member.userEmail}</p>
		</div>
	);
}
