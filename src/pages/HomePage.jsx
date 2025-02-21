import React, { useState, useEffect } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState(''); // Zustand für den Input

  // Prüfen, ob der Name bereits im localStorage gespeichert ist
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName); // Wenn der Name gespeichert ist, setzen wir ihn
    }
  }, []);

  // Funktion zum Setzen des Namens
  const handleNameChange = (e) => {
    setInputValue(e.target.value); // Setze den Wert des Inputs
  };

  // Funktion zum Speichern des Namens
  const saveUserName = () => {
    if (inputValue.trim() !== '') {
      localStorage.setItem('userName', inputValue);
      setUserName(inputValue);
      setInputValue(''); // Input nach dem Speichern zurücksetzen
    }
  };

  // Funktion zum Löschen des Namens
  const deleteUserName = () => {
    localStorage.removeItem('userName');
    setUserName('');
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-extrabold mt-2 mb-2">HANDICALC</h1>

      {/* Wenn der Benutzer noch keinen Namen eingegeben hat */}
      {!userName ? (
        <div>
          <p>Wie heißt du?</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleNameChange}
            placeholder="Gib deinen Namen ein"
            className="p-2 mt-2 border rounded"
          />
          <button
            onClick={saveUserName}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Speichern
          </button>
        </div>
      ) : (
        <div>
          <p>Hallo, {userName}!</p>
          <button
            onClick={deleteUserName}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Namen löschen
          </button>
        </div>
      )}
    </div>
  );
}
