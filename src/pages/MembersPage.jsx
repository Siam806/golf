import { useEffect, useState } from "react";

export default function MembersPage() {
	const [members, setMembers] = useState(undefined);

	useEffect(() => {
		const knownMembers = JSON.parse(localStorage.users ?? "[]");
		setMembers(knownMembers);
	}, []);

	return (
		<div>
			<h1 className="text-4xl font-extrabold mt-2 mb-7">Mitglieder</h1>
			<div className="max-h-[400px] w-[500px] overflow-y-auto">
				{members?.map((member, index) => (
					<div key={index} className="flex flex-col my-5">
						<p>🧑 {member.userName}</p>
						<p>🛠 Rolle: {member.userRole}</p>
						<p>📧 E-Mail: {member.userEmail}</p>
					</div>
				))}
			</div>
		</div>
	);
}
