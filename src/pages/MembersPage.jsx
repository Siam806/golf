import { useEffect, useState } from "react";
import { availableRoles } from "../App";
import MemberItem from "../components/MemberItem";

export default function MembersPage() {
  const [golfers, setGolfers] = useState([]);
  const [gameMasters, setGameMasters] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.users ?? "[]");
    const knownGolfers = users.filter(
      (user) => user.userRole === availableRoles[0]
    );
    const knownGameMasters = users.filter(
      (user) => user.userRole === availableRoles[1]
    );
    setGolfers(knownGolfers);
    setGameMasters(knownGameMasters);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-extrabold mt-2 mb-7">Mitglieder</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Golfers</h2>
        <div className="max-h-[400px] w-[500px] overflow-y-auto mb-8">
          {golfers.map((member, index) => (
            <MemberItem key={index} member={member} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Game Masters</h2>
        <div className="max-h-[400px] w-[500px] overflow-y-auto">
          {gameMasters.map((member, index) => (
            <MemberItem key={index} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
