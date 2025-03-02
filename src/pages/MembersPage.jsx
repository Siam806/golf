import { useEffect, useState } from "react";
import { availableRoles } from "../App";
import MemberItem from "../components/MemberItem";

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
					<MemberItem key={index} member={member} />
				))}
			</div>
		</div>
	);
}
