import React, { useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

export default function EGAForm() {
    const [handicap, setHandicap] = useState('');
    const [par, setPar] = useState('');
    const [strokes, setStrokes] = useState(''); // Fehler behoben
    const [holes, setHoles] = useState(
        Array.from({ length: 18 }, () => ({ par: "", handicap: "", score: "" }))
    );
    const navigate = useNavigate();
    
    // Funktion zur Aktualisierung der Löcher-Daten
    const handleHoleChange = (index, field, value) => {
        const newHoles = [...holes];
        newHoles[index] = { ...newHoles[index], [field]: value };
        setHoles(newHoles);
    };

    // Berechnung des neuen Handicaps
    const calculateHandicap = () => {
        if (!handicap || !par) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        const hcp = parseFloat(handicap);
        const parValue = parseInt(par);
        const strokesValue = holes.reduce((sum, hole) => sum + (parseInt(hole.score) || 0), 0); // Summiert alle Schläge

        if (isNaN(strokesValue)) {
            alert("Bitte gültige Schlagzahlen eingeben!");
            return;
        }

        // Stableford Punkte berechnen
        const stablefordPoints = 36 - (strokesValue - parValue);
        let handicapChange = 0;

        // Handicap-Anpassung nach EGA-System
        if (hcp <= 4.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.1;
            if (stablefordPoints < 36) handicapChange = (35 - stablefordPoints) * -0.1;
        } else if (hcp <= 11.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.2;
            if (stablefordPoints < 35) handicapChange = (34 - stablefordPoints) * -0.1;
        } else if (hcp <= 18.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.3;
            if (stablefordPoints < 34) handicapChange = (33 - stablefordPoints) * -0.1;
        } else if (hcp <= 26.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.4;
        } else if (hcp <= 36) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.5;
        } else {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 1.0;
        }

        // Neues Handicap berechnen
        const newHandicap = hcp - handicapChange;
        const adjustedHandicap = Math.max(-54, Math.min(54, newHandicap));
        const roundedHandicap = parseFloat(adjustedHandicap.toFixed(1));

        // Weiterleitung zur Berechnungsseite mit dem neuen Handicap
        navigate('/calculated', { state: { result: roundedHandicap } });
    };

    return (
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Linke Seite - Eingabefelder */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                <h2 className="text-xl font-bold text-yellow-400">🔢 Eingaben</h2>
                <InputField title="Bisheriges Handicap" value={handicap} onChange={setHandicap} />
                <InputField title="PAR des Golfplatzes" value={par} onChange={setPar} />
            </div>

            {/* Rechte Seite - Grid & Button */}
            <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
                <h2 className="text-xl font-bold text-yellow-400">🏌️‍♂️ Score-Eingabe</h2>

                {/* Grid mit den Löchern */}
                <div className="grid grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg">
                    {holes.map((hole, index) => (
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
                
                {/* Berechnen-Button */}
                <button className="bg-green-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition" onClick={calculateHandicap}>
                    BERECHNEN
                </button>
            </div>
                
        </div>
            
    );
}