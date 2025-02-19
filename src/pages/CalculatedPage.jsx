import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CalculatedPage() {
    const location = useLocation();
    const result = location.state?.result || "Keine Berechnung durchgeführt";

    return (
        <>
            <div className='flex flex-row justify-evenly items-baseline gap-5 mb-10'>
                <Link to="/" className="text-white font-extrabold hover:text-blue-600 active:text-blue-900">{"<-"}</Link>
                <h1 className="text-2xl font-extrabold mb-6">BERECHNUNG</h1>
                <div></div>
            </div>

            <div className="text-center">
                <h2 className="text-xl font-bold">Neues Handicap</h2>
                <p className="text-3xl font-extrabold mt-4">{result}</p>
            </div>
        </>
    );
}
