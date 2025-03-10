import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const RoundDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const roundName = searchParams.get("roundName");
  const roundEmail = searchParams.get("roundEmail");
  const [round, setRound] = useState(null);
  const [editableRound, setEditableRound] = useState(null); // Für die bearbeitbaren Daten
  const [sd, setSD] = useState(null); // Score Differential

  useEffect(() => {
    console.log("hi")
    console.log(roundName, roundEmail);
    const savedRounds = JSON.parse(localStorage.getItem("rounds")) || [];    
    const foundRound = savedRounds.find(round => round.name === roundName && round.email === roundEmail);
    setRound(foundRound);
    setEditableRound(foundRound);
  }, [roundName, roundEmail]); // Hier beide Parameter beachten!

  useEffect(() => {
    if (editableRound && editableRound.slopeRating && editableRound.courseRating && editableRound.par) {
      const totalScore = editableRound.scores.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
      const sdValue = ((totalScore - editableRound.courseRating) / editableRound.slopeRating) * 113;
      setSD(sdValue.toFixed(2));
    }
  }, [editableRound]);

  if (!round) {
    return (
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-6">
        <p className="text-xl text-center text-gray-400">Runde nicht gefunden.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableRound((prevRound) => ({
      ...prevRound,
      [name]: value,
    }));
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...editableRound.scores];
    newScores[index] = value;
    setEditableRound((prevRound) => ({
      ...prevRound,
      scores: newScores,
    }));
  };

  const saveChanges = () => {
    const totalScore = editableRound.scores.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    const sdValue = ((totalScore - editableRound.courseRating) / editableRound.slopeRating) * 113;
    const updatedRound = { ...editableRound, sd: sdValue.toFixed(2) };

    const savedRounds = JSON.parse(localStorage.getItem("rounds")) || {};
    
    const updatedRounds = savedRounds.map((r) =>
      r.name === roundName && r.email === roundEmail ? updatedRound : r
    );
    localStorage.setItem("rounds", JSON.stringify(updatedRounds));
  
    alert("Änderungen gespeichert!");
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🏌️‍♂️ Runde: {round.name}</h2>

      <div className="mb-4">
        <label className="block font-semibold">Name der Runde</label>
        <input
          type="text"
          name="name"
          value={editableRound.name}
          onChange={handleInputChange}
          className="w-full p-2 text-white bg-gray-700 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold">Slope Rating</label>
          <input
            type="number"
            name="slopeRating"
            value={editableRound.slopeRating}
            onChange={handleInputChange}
            className="w-full p-2 text-white bg-gray-700 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Course Rating</label>
          <input
            type="number"
            name="courseRating"
            value={editableRound.courseRating}
            onChange={handleInputChange}
            className="w-full p-2 text-white bg-gray-700 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Par</label>
          <input
            type="number"
            name="par"
            value={editableRound.par}
            onChange={handleInputChange}
            className="w-full p-2 text-white bg-gray-700 border rounded"
          />
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Schläge pro Loch</h3>
      <div className="grid grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg">
        {editableRound.scores.map((score, index) => (
          <input
            key={index}
            type="number"
            value={score}
            onChange={(e) => handleScoreChange(index, e.target.value)}
            className="p-2 text-white bg-gray-700 border rounded w-12 text-center"
            placeholder={index + 1}
          />
        ))}
      </div>

      {sd && (
        <div className="mt-4 text-center text-xl font-bold bg-green-700 p-3 rounded-lg">
          Score Differential: <span className="text-white">{sd}</span>
        </div>
      )}

      <button
        onClick={saveChanges}
        className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-bold text-lg"
      >
        Änderungen speichern
      </button>

      <a
        href="/results"
        className="mt-6 inline-block bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
      >
        Zurück zur Ergebnisübersicht
      </a>
    </div>
  );
};

export default RoundDetailsPage;
