import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResultsPage = () => {
  const [rounds, setRounds] = useState([]);

  // Runden aus dem localStorage laden
  useEffect(() => {
    const savedRounds = JSON.parse(localStorage.getItem("rounds")) || [];
    const roundsKey = localStorage.getItem("userName")+"__"+localStorage.getItem("userEmail");
    if (!(roundsKey in savedRounds)) {
      savedRounds[roundsKey] = [];
    }
    setRounds(savedRounds[roundsKey]);
  }, []);

  const handleDelete = (roundName) => {
    // Filtern die Runde aus der Liste der gespeicherten Runden
    const updatedRounds = rounds.filter((round) => round.name !== roundName);
    
    // Speichern die aktualisierte Liste der Runden im localStorage
    localStorage.setItem("rounds", JSON.stringify(updatedRounds));

    // Setze den State, um die gelöschte Runde sofort aus der Anzeige zu entfernen
    setRounds(updatedRounds);

    alert("Runde gelöscht!");
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🏌️‍♂️ Alle Runden</h2>
      <div className="space-y-4">
        {rounds.length === 0 ? (
            <p className="text-center">Noch keine Runden gespeichert. <br />
            Trage sie in <Link to={`/sd`} className="underline hover:text-gray-500">SD</Link> ein.</p>
        ) : (
          rounds.map((round) => (
            <div key={round.name} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{round.name}</h3>
                <p>Score Differential: {round.sd}</p>
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/round/${round.name}`}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleDelete(round.name)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                >
                  Löschen
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
