import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CalculatedPage() {
    const location = useLocation();
    const result = location.state?.result || "Keine Berechnung durchgeführt";
    const scoreDifferential = location.state?.scoreDifferential || "Keine Berechnung durchgeführt";
    const saveRound = () => {
        console.log("Runde gespeichert!" + round);
        // Hier kannst du die Daten speichern (z. B. in einer API oder im LocalStorage)
        
    };
    
    // Funktion global verfügbar machen
    window.saveRound = saveRound;

    return (
        <>
            <div className='flex flex-row justify-evenly items-baseline gap-5 mb-10'>
                <Link to="/ega" className="text-white font-extrabold hover:text-blue-600 active:text-blue-900">{"<-"}</Link>
                <h1 className="text-2xl font-extrabold mb-6">BERECHNUNG</h1>
                <div></div>
            </div>

            <div className="text-center">
                <h2 className="text-xl font-bold">Neues Handicap</h2>
                <p className="text-3xl font-extrabold mt-4">{result}</p>
            </div>   
            <div className="text-center">
                <h2 className="text-xl font-bold">Score Differential</h2>
                <p className="text-3xl font-extrabold mt-4">{scoreDifferential}</p>
            </div>   
            <button 
                className="bg-green-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition mt-6"
                onClick={() => window.saveRound && window.saveRound()}
                >       
                Speichern
            </button>
     
        </>
    );
}
