import React from "react";
import { useNavigate } from "react-router-dom";

export default function MemberItem({ member }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Übergibt nur die E-Mail des Spielers
    navigate("/results?userEmail=" + member.userEmail);
  };

  return (
    <div className="flex gap-5 items-center justify-between my-4 text-[14px] mr-4">
      <div className="flex-1 flex flex-row justify-between gap-5 border border-gray-300 p-5 rounded-lg text-nowrap overflow-x-auto">
        <span>🧑 {member.userName}</span>
        <span>⛳ {member.userHandicap ?? ""}</span>
        <span>📧 {member.userEmail}</span>
      </div>
      <button onClick={handleClick} className="bg-green-500 text-white/90 p-2 rounded-lg hover:bg-green-700">
        <span className="material-icons">visibility</span>
      </button>
    </div>
  );
}