import React, { useState } from 'react';
import InputField from './InputField';
import { Link, useNavigate } from 'react-router-dom';

export default function EGAForm() {
    const [handicap, setHandicap] = useState('');
    const [par, setPar] = useState('');
    const [strokes, setStrokes] = useState('');
    const navigate = useNavigate();

    // Berechnung des neuen Handicaps
    const calculateHandicap = () => {
        if (!handicap || !par || !strokes) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        const hcp = parseFloat(handicap);
        const parValue = parseInt(par);
        const strokesValue = parseInt(strokes);

        // Stableford Punkte berechnen
        const stablefordPoints = 36 - (strokesValue - parValue);
        console.log(stablefordPoints);
        let handicapChange = 0;

        // Anpassung des Handicaps basierend auf der Stableford-Punkte-Tabelle
        if (hcp <= 4.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.1;
            if (stablefordPoints < 36) handicapChange = (35 - stablefordPoints) * -0.1;
            console.log("Weg 1 genommen");
        } else if (hcp <= 11.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.2;
            if (stablefordPoints < 35) handicapChange = (34 - stablefordPoints) * -0.1;
            console.log("Weg 2 genommen");
        } else if (hcp <= 18.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.3;
            if (stablefordPoints < 34) handicapChange = (33 - stablefordPoints) * -0.1;
            console.log("Weg 3 genommen");
        } else if (hcp <= 26.4) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.4;
            if (stablefordPoints < 33) handicapChange = 0;
            console.log("Weg 4 genommen");
        } else if (hcp <= 36) {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 0.5;
            if (stablefordPoints < 33) handicapChange = 0;
            console.log("Weg 5 genommen");
        } else {
            if (stablefordPoints > 36) handicapChange = (stablefordPoints - 36) * 1.0;
            if (stablefordPoints < 33) handicapChange = 0;
            console.log("Weg 6 genommen");
        }

        // Neues Handicap berechnen
        const newHandicap = hcp - handicapChange;
        console.log(newHandicap);
        // Begrenzung des Handicaps zwischen -54 und +54
        const adjustedHandicap = Math.max(-54, Math.min(54, newHandicap));
        console.log(adjustedHandicap);
        const roundedHandicap = parseFloat(adjustedHandicap.toFixed(1));
        console.log(roundedHandicap);
        // Weiterleitung zur Berechnungsseite mit dem neuen Handicap
        navigate('/calculated', { state: { result: roundedHandicap } });
    };

    return (
        <div>
            <div className='flex justify-center items-center flex-col'>
                <section className='flex justify-center flex-row mt-10 mb-15'>
                    <InputField title="Bisheriges Handicap" value={handicap} onChange={setHandicap} />
                    <div className='w-20'></div>
                    <InputField title="PAR des Golfplatzes" value={par} onChange={setPar} />
                </section>

                <InputField title="Anzahl Schläge" value={strokes} onChange={setStrokes} />

                <button 
                    className="mt-15 border-2 bg-gray-700 px-4 py-2 rounded-2xl active:bg-gray-600"
                    onClick={calculateHandicap}
                >
                    BERECHNEN
                </button>
            </div>
        </div>
    );
}
