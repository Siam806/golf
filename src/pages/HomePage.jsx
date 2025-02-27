import React, { useState, useEffect } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const testUser = "test_user";
    const testEmail = "test@example.com";
    const testKey = `${testUser}__${testEmail}`;
    const testRounds = [
    {
      name: "Runde 1",
      slopeRating: 115,
      courseRating: 70.9,
      par: 72,
      scores: [5, 6, 8, 7, 6, 6, 6, 6, 6, 7, 6, 6, 5, 6, 6, 6, 5, 6],
      sd: 37.4,
    },
    {
      name: "Runde 2",
      slopeRating: 115,
      courseRating: 70.9,
      par: 72,
      scores: [4, 5, 5, 6, 6, 5, 6, 9, 5, 5, 6, 6, 5, 6, 6, 6, 5, 6],
      sd: 29.6,
    },
    {
      name: "Runde 3",
      slopeRating: 130,
      courseRating: 72.3,
      par: 72,
      scores: [4, 5, 5, 6, 6, 7, 4, 8, 4, 5, 6, 6, 5, 6, 6, 6, 5, 6],
      sd: 24.1,
    },
    {
      name: "Runde 4",
      slopeRating: 130,
      courseRating: 72.3,
      par: 72,
      scores: [5, 6, 6, 7, 6, 6, 4, 7, 6, 7, 6, 6, 5, 5, 6, 6, 5, 6],
      sd: 28.4,
    },
    {
      name: "Runde 5",
      slopeRating: 115,
      courseRating: 70.9,
      par: 72,
      scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5],
      sd: 18.8,
    },
    {
      name: "Runde 6",
      slopeRating: 115,
      courseRating: 34.1,
      par: 35,
      scores: [5, 6, 6, 7, 6, 5, 5, 6, 6],
      sd: 31.1
    },
    {
      name: "Runde 7",
      slopeRating: 115,
      courseRating: 34.1,
      par: 35,
      scores: [5, 7, 9, 7, 6, 6, 6, 6, 6],
      sd: 36
    },
    {
      name: "Runde 8",
      slopeRating: 115,
      courseRating: 70.9,
      par: 72,
      scores: [4, 5, 5, 6, 6, 5, 4, 5, 5, 7, 5, 5, 4, 5, 5, 7, 5, 5],
      sd: 21.7
    },
    {
      name: "Runde 9",
      slopeRating: 130,
      courseRating: 72.3,
      par: 72,
      scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5],
      sd: 15.4
    },
    {
      name: "Runde 10",
      slopeRating: 130,
      courseRating: 35.7,
      par: 35,
      scores: [4, 5, 5, 6, 5, 5, 4, 5, 5],
      sd: 21.7
    },
    {
      name: "Runde 11",
      slopeRating: 130,
      courseRating: 35.7,
      par: 35,
      scores: [5, 6, 6, 7, 6, 6, 5, 6, 6],
      sd: 28.6
    },
    {
      name: "Runde 12",
      slopeRating: 130,
      courseRating: 72.3,
      par: 72,
      scores: [6, 7, 7, 8, 7, 7, 6, 7, 10, 8, 7, 7, 6, 7, 7, 8, 7, 7],
      sd: 46.7
    }];


    const savedRounds = JSON.parse(localStorage.getItem("rounds")) || {};
    savedRounds[testKey] = testRounds;
    localStorage.setItem("rounds", JSON.stringify(savedRounds));
    
    const storedName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedName) setUserName(storedName);
    if (storedRole) setRole(storedRole);
    if (storedEmail) setEmail(storedEmail);    
  }, []);

  const handleNameChange = (e) => setInputValue(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const saveUserData = () => {
    if (inputValue.trim() !== '' && email.trim() !== '' && role !== '') {
      localStorage.setItem('userName', inputValue);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      setUserName(inputValue);
      setInputValue('');
    } else {
      alert('Bitte alle Felder ausfüllen!');
    }
  };

  const deleteUserData = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUserName('');
    setRole('');
    setEmail('');
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-extrabold mt-2 mb-4">HANDICALC</h1>

      {!userName ? (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Wie heißt du?</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleNameChange}
              placeholder="Gib deinen Namen ein"
              className="w-64 p-3 border rounded bg-gray-100 text-black"
            />
          </div>

          <div>
            <label className="block font-semibold">Wähle deine Rolle:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-64 p-3 border rounded bg-gray-100 text-black"
            >
              <option value="" disabled>
                -- Wähle eine Rolle --
              </option>
              <option value="Einfacher Golfer">Einfacher Golfer</option>
              <option value="Sekretärin">Sekretärin</option>
              <option value="Spielführer">Spielführer</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Gib deine E-Mail ein:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="E-Mail-Adresse"
              className="w-64 p-3 border rounded bg-gray-100 text-black"
            />
          </div>

          <button onClick={saveUserData} className="block mx-auto mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Speichern
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">👋 Hallo, <span className="font-bold">{userName}</span>!</p>
          <p className="text-lg">🛠 Rolle: <span className="font-bold">{role}</span></p>
          <p className="text-lg">📧 E-Mail: <span className="font-bold">{email}</span></p>

          <button onClick={deleteUserData} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Daten löschen
          </button>
        </div>
      )}
    </div>
  );
}
