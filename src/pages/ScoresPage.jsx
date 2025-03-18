import React, { useState } from "react";
import ScoresRechner from "../components/ScoresRechner";

export default function ScoresPage() {
	const [ega, setega] = useState();
	const [whs, setwhs] = useState();

	return (
		<div className="w-full max-w-[1800px] h-[90%] max-h-[1300px] grid grid-cols-[5fr_1fr] gap-6 text-center text-sm">
			<div className="bg-gray-900 p-8 rounded-4xl shadow-green-400 shadow-lg">
				<h1 className="text-2xl font-extrabold mb-10">SCORES</h1>
				<ScoresRechner setega={setega} setwhs={setwhs} />
			</div>

			<div className="bg-gray-900 p-8 rounded-4xl shadow-green-400 shadow-lg grid grid-rows-2 gap-8 text-center">
				<div>
					<h1 className="text-2xl font-extrabold mb-8">EGA:</h1>
					<div className="h-full flex justify-center items-start text-white font-extrabold text-3xl">{ega}</div>
				</div>
				<div>
					<h1 className="text-2xl font-extrabold mb-8">WHS:</h1>
					<div className="h-full flex justify-center items-start text-white font-extrabold text-3xl">{whs}</div>
				</div>
			</div>
		</div>
	);
}
