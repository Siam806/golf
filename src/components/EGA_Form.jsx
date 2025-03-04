import React, { useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

export default function EGAForm() {
    const [handicap, setHandicap] = useState('-37');
    const [par, setPar] = useState('72');
    const [courseRating, setCourseRating] = useState('70.9');
    const [slopeRating, setSlopeRating] = useState('115');
    const [isNineHoles, setIsNineHoles] = useState(false);
    const navigate = useNavigate();
    
    const holeCount = isNineHoles ? 9 : 18;
    const generateTestHoles = () => [
        { par: 3, handicap: 4, score: 4 },
        { par: 4, handicap: 16, score: 5 },
        { par: 4, handicap: 1, score: 5 },
        { par: 5, handicap: 10, score: 6 },
        { par: 4, handicap: 7, score: 6 },
        { par: 4, handicap: 13, score: 5 },
        { par: 3, handicap: 5, score: 6 },
        { par: 4, handicap: 17, score: 9 },
        { par: 4, handicap: 2, score: 5 },
        { par: 5, handicap: 11, score: 5 },
        { par: 4, handicap: 8, score: 6 },
        { par: 4, handicap: 14, score: 6 },
        { par: 3, handicap: 6, score: 5 },
        { par: 4, handicap: 18, score: 6 },
        { par: 4, handicap: 3, score: 6 },
        { par: 5, handicap: 12, score: 6 },
        { par: 4, handicap: 9, score: 5 },
        { par: 4, handicap: 15, score: 6 }
    ];

    const [holes, setHoles] = useState(generateTestHoles());
       /* Array.from({ length: 18 }, () => ({ par: "", handicap: "", score: "" }))
    );*/

    const handleHoleChange = (index, field, value) => {
        const newHoles = [...holes];
        newHoles[index] = { ...newHoles[index], [field]: value };
        setHoles(newHoles);
    };

    const toggleHoleCount = () => {
        setIsNineHoles((prev) => !prev);
    };

    const calculateHandicap = () => {
        if (!handicap || !par || !courseRating || !slopeRating) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        const hcp = parseFloat(handicap);
        const parValue = parseInt(par);
        const courseRatingValue = parseFloat(courseRating);
        const slopeRatingValue = parseInt(slopeRating);
        const strokesValue = holes.slice(0, holeCount).reduce((sum, hole) => sum + (parseInt(hole.score) || 0), 0);

        if (isNaN(strokesValue)) {
            alert("Bitte gültige Schlagzahlen eingeben!");
            return;
        }

        const stablefordPoints = 36 - (strokesValue - parValue);
        let handicapChange = 0;

        if (hcp <= 4.4) {
            handicapChange = (stablefordPoints - 36) * 0.1;
            console.log("HCP 1");
        } else if (hcp <= 11.4) {
            handicapChange = (stablefordPoints - 36) * 0.2;
            console.log("HCP 2");
        } else if (hcp <= 18.4) {
            handicapChange = (stablefordPoints - 36) * 0.3;
            console.log("HCP 3");
        } else if (hcp <= 26.4) {
            handicapChange = (stablefordPoints - 36) * 0.4;
            console.log("HCP 4");
        } else if (hcp <= 36) {
            handicapChange = (stablefordPoints - 36) * 0.5;
            console.log("HCP 5");
        } else {
            handicapChange = (stablefordPoints - 36) * 1.0;
            console.log("HCP 6");
            console.log(handicapChange);
        }

        const newHandicap = hcp - handicapChange;
        const adjustedHandicap = Math.max(-54, Math.min(54, newHandicap));
        const roundedHandicap = parseFloat(adjustedHandicap.toFixed(1));

        navigate('/calculated', { state: { result: roundedHandicap } });
    };

    return (
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                <h2 className="text-xl font-bold text-yellow-400">🔢 Eingaben</h2>
                <InputField title="Bisheriges Handicap" value={handicap} onChange={setHandicap} />
                <InputField title="PAR des Golfplatzes" value={par} onChange={setPar} />
                <InputField title="Course Rating" value={courseRating} onChange={setCourseRating} />
                <InputField title="Slope Rating" value={slopeRating} onChange={setSlopeRating} />
                <button 
                    className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-700 transition"
                    onClick={toggleHoleCount}
                >
                    {isNineHoles ? "Auf 18 Löcher wechseln" : "Auf 9 Löcher wechseln"}
                </button>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
                <h2 className="text-xl font-bold text-yellow-400">🏌️‍♂️ Score-Eingabe</h2>
                <div className="grid grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg">
                    {holes.slice(0, holeCount).map((hole, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-white text-sm">Loch {index + 1}</span>
                            <input
                                type="number"
                                value={hole.par}
                                onChange={(e) => handleHoleChange(index, "par", e.target.value)}
                                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                                placeholder="Par"
                            />
                            <input
                                type="number"
                                value={hole.handicap}
                                onChange={(e) => handleHoleChange(index, "handicap", e.target.value)}
                                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                                placeholder="HCP"
                            />
                            <input
                                type="number"
                                value={hole.score}
                                onChange={(e) => handleHoleChange(index, "score", e.target.value)}
                                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                                placeholder="Schläge"
                            />
                        </div>
                    ))}
                </div>
                <button className="bg-green-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition" onClick={calculateHandicap}>
                    BERECHNEN
                </button>
            </div>
        </div>
    );
}
