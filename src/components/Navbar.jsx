import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [userName, setUserName] = useState('');

  // useEffect, der beim Laden die Namen aus localStorage abruft und regelmäßig prüft
  useEffect(() => {
    // Funktion, um den gespeicherten Namen aus dem localStorage zu holen
    const getUserNameFromLocalStorage = () => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName); // Benutzername setzen, wenn er im localStorage vorhanden ist
      } else {
        setUserName("")
      }
    };

    // Beim ersten Laden die Daten abfragen
    getUserNameFromLocalStorage();

    // useEffect wird erneut ausgeführt, wenn sich der userName im localStorage ändert
    const interval = setInterval(getUserNameFromLocalStorage, 1000); // alle 1 Sekunde nach Änderungen suchen

    // Aufräumen des Intervalls bei Unmount
    return () => clearInterval(interval);

  }, []); // Der Effekt läuft nur einmal, beim ersten Laden der Komponente

  return (
    <nav className="fixed top-0 left-0 z-50 w-screen bg-green-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 hover:underline">
        <img width="40" src="/favicon.png" alt="Favicon" />
        <h1 className="text-xl font-bold">Handicalc</h1>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/sd" className="hover:underline">
            SD
          </Link>
        </li>
        <li>
          <Link to="/results" className="hover:underline">
            Ergebnisse
          </Link>
        </li>
        <li>
          <Link to="/ega" className="hover:underline">
            EGA
          </Link>
        </li>
        <li>
          <Link to="/whs" className="hover:underline">
            WHS
          </Link>
        </li>
        {/* Begrüßung in der Navbar */}
        {userName && <li className="ml-10">👋 Hallo, {userName}!</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
