import React, { useState } from "react";
import { authContext } from "../context/AuthContext";
import { useContext } from "react";


const SDForm = () => {
  const [slopeRating, setSlopeRating] = useState("113");
  const [courseRating, setCourseRating] = useState("72");
  const [par, setPar] = useState("70.9");
  const [scores, setScores] = useState(Array(18).fill("6")); // 18 Löcher
  const [sd, setSD] = useState(null); // Score Differential
  const [roundName, setRoundName] = useState(""); // Name der Runde
  const { currentUser } = useContext(authContext);

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const calculateSD = () => {
    const totalScore = scores.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    if (slopeRating && courseRating && par) {
      const sdValue = ((totalScore - courseRating) / slopeRating) * 113;
      setSD(sdValue.toFixed(2));
    } else {
      alert("Bitte alle Werte eingeben!");
    }
  };

  const saveRound = () => {
    // User-Daten aus dem Local Storage holen
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Den aktuellen Nutzer finden
    let userIndex = users.findIndex((user) => user.userEmail === currentUser.userEmail);
    
    if (userIndex === -1) {
      alert("Benutzer nicht gefunden!");
      return;
    }
  
    // Nutzer-Objekt holen
    let userData = users[userIndex];
  
    // Sicherstellen, dass 'rounds' existiert
    if (!userData.rounds) {
      userData.rounds = [];
    }
  
    // Überprüfen, ob der Name bereits existiert
    const isDuplicate = userData.rounds.some((round) => round.name === roundName);
  
    if (isDuplicate) {
      alert("Dieser Name ist bereits vergeben! Bitte wähle einen anderen.");
      return;
    }
  
    // Neue Runde erstellen
    const round = {
      userEmail: currentUser.userEmail,
      name: roundName || `Runde_${userData.rounds.length + 1}`, // Falls kein Name eingegeben wurde
      slopeRating,
      courseRating,
      par,
      scores,
      sd,
    };
  
    // Runde hinzufügen
    userData.rounds.push(round);
  
    // Nutzer-Daten im `users`-Array aktualisieren
    users[userIndex] = userData;
  
    // Geändertes Array zurück in den Local Storage speichern
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Runde gespeichert!");
  };
  
  
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🏌️‍♂️ Score Differential Rechner</h2>
      
      <div className="mb-4">
        <label className="block font-semibold">Name der Runde</label>
        <input
          type="text"
          value={roundName}
          onChange={(e) => setRoundName(e.target.value)}
          className="w-full p-4 text-white bg-gray-700 border rounded"
          placeholder="Gib der Runde einen Namen oder lass es leer für Standard"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold">Slope Rating</label>
          <input
            type="number"
            value={slopeRating}
            onChange={(e) => setSlopeRating(e.target.value)}
            className="w-full p-4 text-white bg-gray-700 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Course Rating</label>
          <input
            type="number"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            className="w-full p-4 text-white bg-gray-700 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Par</label>
          <input
            type="number"
            value={par}
            onChange={(e) => setPar(e.target.value)}
            className="w-full p-4 text-white bg-gray-700 border rounded"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6 text-center">Schläge pro Loch</h3>
      <div className="grid grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg">
        {scores.map((score, index) => (
          <input
            key={index}
            type="number"
            value={score}
            onChange={(e) => handleScoreChange(index, e.target.value)}
            className="p-4 text-white bg-gray-700 border rounded w-16 text-center"
            placeholder={index + 1}
          />
        ))}
      </div>

      <button
        onClick={calculateSD}
        className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold text-lg"
      >
        Berechne Score Differential
      </button>

      {sd !== null && (
        <div className="mt-6 text-center text-2xl font-bold bg-green-700 p-3 rounded-lg">
          Score Differential: <span className="text-white">{sd}</span>
        </div>
      )}

      <button
        onClick={saveRound}
        className={`mt-6 w-full p-3 rounded-lg font-bold text-lg ${sd === null ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={sd === null} // Button wird nur aktiviert, wenn ein SD berechnet wurde
      >
        Runde Speichern
      </button>
    </div>
  );
};

export default SDForm;
