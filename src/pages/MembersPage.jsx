import { useEffect, useState } from "react";
import { availableRoles } from "../App";

export default function MembersPage() {
	const [golfers, setGolfers] = useState(undefined);

	useEffect(() => {
		const knownGolfers = JSON.parse(localStorage.users ?? "[]").filter((user) => user.userRole === availableRoles[0]);
		setGolfers(knownGolfers);
	}, []);

	return (
		<div>
			<h1 className="text-4xl font-extrabold mt-2 mb-7">Mitglieder</h1>
			<div className="max-h-[400px] w-[500px] overflow-y-auto">
				{golfers?.map((member, index) => (
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
