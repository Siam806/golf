import React, { useState, useEffect } from 'react';

const WHSPage = () => {
  const [rounds, setRounds] = useState([]); // Zum Speichern der Runden aus localStorage
  const [whsHandicap, setWHSHandicap] = useState(null); // Das berechnete WHS Handicap
  const [bestRounds, setBestRounds] = useState([]); // Die besten Runden, die für das Handicap verwendet werden

  // Runden aus localStorage laden
  useEffect(() => {
    const savedRounds = JSON.parse(localStorage.getItem("rounds")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { 
      userName: "testUser", 
      userRole: "Golfer", 
      userEmail: "test@t.de",
      userHandicap: 54,
    };
    const userRounds = savedRounds.filter((round) => round.email == currentUser.userEmail);
    setRounds(userRounds);
  }, []);

  // Funktion zum Berechnen des WHS Handicap
  const calculateWHS = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { 
      userName: "testUser", 
      userRole: "Golfer", 
      userEmail: "test@t.de",
      userHandicap: 54,
    };

    if (rounds.length === 0) {
      alert('Keine Runden gespeichert!');
      return;
    }

    // Bestimmen, wie viele der besten Runden verwendet werden
    let roundsToUse = 0;
    if (rounds.length >= 20) {
        roundsToUse = 8;
    } else if (rounds.length >= 19) {
        roundsToUse = 7;
    } else if (rounds.length >= 17) {
        roundsToUse = 6;
    } else if (rounds.length >= 15) {
        roundsToUse = 5;
    } else if (rounds.length >= 12) {
        roundsToUse = 4;
    } else if (rounds.length >= 9) {
        roundsToUse = 3;
    } else if (rounds.length >= 6) {
        roundsToUse = 2;
    } else {
        roundsToUse = 1;
    }

    // Runden sortieren nach SD und die besten Runden auswählen
    const sortedRounds = rounds
      .sort((a, b) => parseFloat(a.sd) - parseFloat(b.sd)) // Sortiert die Runden nach SD
      .slice(0, roundsToUse); // Nur die besten Runden basierend auf der Anzahl

    // Speichern der besten Runden für die Anzeige
    setBestRounds(sortedRounds);

    // Durchschnitt der besten Runden berechnen
    const avgBestSD = sortedRounds.reduce((sum, round) => sum + parseFloat(round.sd), 0) / sortedRounds.length;

    // WHS Handicap berechnen (wird jetzt nur durch SD berechnet)
    currentUser.userHandicap = avgBestSD.toFixed(2);
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    setWHSHandicap(avgBestSD.toFixed(2)); // Ergebnis anzeigen
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🏌️‍♂️ World Handicap System (WHS)</h2>

      <button
        onClick={calculateWHS}
        className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold text-lg"
      >
        Berechne WHS Handicap
      </button>

      {whsHandicap !== null && (
        <div className="mt-6 text-center text-2xl font-bold bg-green-700 p-3 rounded-lg">
          Dein WHS Handicap: <span className="text-white">{whsHandicap}</span>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center">Verwendete Runden für die WHS Berechnung:</h3>
        <table className="min-w-full table-auto mt-4 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-green-700 text-white">Runde</th>
              <th className="px-4 py-2 bg-green-700 text-white">Score Differential (SD)</th>
            </tr>
          </thead>
          <tbody>
            {bestRounds.map((round, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{round.name}</td>
                <td className="px-4 py-2">{round.sd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rounds.length === 0 && (
        <p className="text-center mt-6 text-white">Noch keine Runden gespeichert. Trage sie ein, um dein Handicap zu berechnen.</p>
      )}
    </div>
  );
};

export default WHSPage;
