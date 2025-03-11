import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Beispielhafter InputField-Stub.
// Nimm entweder deinen bestehenden InputField-Komponenten-Import
// oder ersetze diesen Code durch deine Version


function InputField({ title, value, onChange }) {
  return (
    <label className="block">
      <span className="text-white">{title}</span>
      <input
        type="text"
        className="p-2 text-white bg-gray-700 border rounded w-full mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function HCPtoVorgabe_Form() {
  const [hcp, setHCP] = useState('');
  const [slr, setSLR] = useState('');
  const [result, setResult] = useState(null);

  const calculation = () => {
    // String -> Zahl konvertieren
    const numericHcp = parseFloat(hcp) || 0;
    const numericSlr = parseFloat(slr) || 0;

    // Berechnung durchführen
    const erg = numericHcp * (numericSlr / 113);

    // Auf ganze Zahl runden
    const roundedResult = Math.round(erg);

    // Ergebnis im State speichern
    setResult(roundedResult);
  };

  
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-yellow-400">🔢 Eingaben</h2>
        <InputField title="Bisheriges Handicap" value={hcp} onChange={setHCP} />
        <InputField title="Slope Rating" value={slr} onChange={setSLR} />

        <button
          className="bg-green-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition"
          onClick={() => {calculation()}}
        >
          BERECHNEN & Speichern
        </button>
        {result !== null && (
         <div className="mt-2 p-2 bg-gray-700 text-white">
           Ergebnis: {result}
         </div>
        )}
     </div>
    </div>   
  )
}