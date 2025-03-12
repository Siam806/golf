import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ResultsPage = () => {
  const [rounds, setRounds] = useState([]);
  const [roundsForWho, setRoundsForWho] = useState("");
  const { currentUser } = useContext(authContext);
  const [searchParams] = useSearchParams();
  const userEmailFromUrl = searchParams.get("userEmail"); // User-E-Mail aus den URL-Parametern holen

  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];  
    let allRounds = [];

    if (currentUser.userRole === "Spielführer" && userEmailFromUrl) {
      // Falls Spielführer und userEmail in der URL ist, nur diesen Nutzer anzeigen
      const selectedUser = users.find(user => user.userEmail === userEmailFromUrl);
      allRounds = selectedUser?.rounds || [];
      setRoundsForWho(" von " + selectedUser?.userName);
    } else if (currentUser.userRole === "Spielführer") {
      // Falls Spielführer ohne userEmail → Alle Runden anzeigen
      users.forEach(user => {
        if (user.rounds) {
          allRounds = [...allRounds, ...user.rounds];
        }
      });
    } else {
      // Falls normaler User → nur eigene Runden anzeigen
      const userData = users.find(user => user.userEmail === currentUser.userEmail);
      allRounds = userData?.rounds || [];
      setRoundsForWho(" von " + currentUser.userName);
    }

    setRounds(allRounds);
  }, [currentUser, userEmailFromUrl]);
  const handleDetailsClick = (round) => {
    if (round?.type === "whs") {
      navigate(`/round?roundName=${round.name}&roundEmail=${round.userEmail}`);
    } else {
      navigate(`/roundEGA?roundName=${round.name}&roundEmail=${round.userEmail}`);
    }
  };
  

  const handleDelete = (roundName, roundEmail) => {
    // Filtern die Runde aus der Liste der gespeicherten Runden
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Den aktuellen Nutzer finden
    let userIndex = users.findIndex((user) => user.userEmail === roundEmail);
  
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
  
    // Runde löschen und das gefilterte Array zurücksetzen
    userData.rounds = userData.rounds.filter((round) => round.name !== roundName);
  
    // Nach dem Löschen -> Neunummerierung für Runden, die dem Format "Runde_X" entsprechen
    let count = 1;
    userData.rounds = userData.rounds.map((round) => {
      if (/^Runde_\d+$/.test(round.name)) { // Überprüfung auf "Runde_X"
        return { ...round, name: `Runde_${count++}` };
      }
      return round; // Benutzerdefinierte Namen bleiben unverändert
    });
    
    // Nutzer-Daten im `users`-Array aktualisieren
    users[userIndex] = userData;
  
    // Geändertes Array zurück in den Local Storage speichern
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Runde gelöscht!");
    window.location.reload(); // Seite neu laden, um den aktuellen Stand anzuzeigen
    
  };
  

  return (
  <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-6xl mx-auto mt-6">
    <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🏌️‍♂️ Alle Runden{roundsForWho}</h2>
    
    {/* Scrollbarer Container */}
    <div className="max-h-[500px] overflow-y-auto space-y-4 p-2 border border-gray-700 rounded-lg">
      {rounds.length === 0 ? (
        <p className="text-center">
          Noch keine Runden gespeichert. <br />
          Trage sie in <Link to={`/sd`} className="underline hover:text-gray-500">SD</Link> ein.
        </p>
      ) : (
        rounds.map((round) => (
          <div key={round.name+round.userEmail} className="bg-gray-800 p-6 rounded-lg flex justify-between items-center w-full">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{round.name}</h3>
              <p>Score Differential: {round.sd}</p>
              {currentUser.userRole == "Spielführer" ? <p>Nutzer: {round.userEmail}</p> : <></>}
            </div>
            <div className="flex gap-4">
              <button
                  onClick={() => handleDetailsClick(round)}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  Details
              </button>
              <button
                onClick={() => handleDelete(round.name, round.userEmail)}
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
