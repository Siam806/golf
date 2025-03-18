import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

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
      allRounds = currentUser?.rounds ?? [];
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

  const generateWhsScorecard = (round) => {
    if (!round) return;
    const docDefinition = {
      content: [
        { text: "Golf Scorecard", style: "header" },
        { text: `Spieler: ${round.userEmail}` },
        { text: `Runde: ${round.name}` },
        { text: `Handicap: ${JSON.parse(localStorage.getItem("currentUser")).userHandicap ?? "Nicht verfügbar"}` },
        { text: `Slope Rating: ${round.slopeRating}` },
        { text: `Course Rating: ${round.courseRating}` },
        { text: `Score Differential (SD): ${round.sd}` },
        { text: "Scores:", style: "subheader" },
        {
          table: {
            body: [
              ["Loch", "Score"],
              ...round.scores.map((score, index) => [index + 1, score]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      },
    };
  
    pdfMake.createPdf(docDefinition).download(`Scorecard_${round.name}.pdf`);
  };

  const generateEGAScorecard = (round) => {
    if (!round) return;
  
    const holesData = round.holes.map((hole, index) => {
      // Hier wird jedes Loch als Array von [Lochnummer, Handicap, Schlaganzahl] erstellt.
      const holeData = [
        index + 1, // Lochnummer
        hole.handicap || "", // Handicap
        hole.score || "", // Schlaganzahl
      ];
      return holeData;
    });
  
    const docDefinition = {
      content: [
        { text: "Golf Scorecard", style: "header" },
        { text: `Spieler: ${round.userEmail}` },
        { text: `Runde: ${round.name}` },        
        { text: `Handicap: ${JSON.parse(localStorage.getItem("currentUser")).userHandicap ?? "Nicht verfügbar"}` },
        { text: `Slope Rating: ${round.slopeRating}` },
        { text: `Course Rating: ${round.courseRating}` },
        { text: `Score Differential (SD): ${round.sd}` },
        { text: "Scores:", style: "subheader" },
        {
          table: {
            body: [
              ["Loch", "Handicap", "Schläge"],
              ...holesData, // Hier fügen wir die Loch-Daten ein.
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 20, 0, 20],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download(`Scorecard_${round.name}.pdf`);

  };
  
  


  const handleDruckClick = (round) => {
    if (round?.type === "whs") {
      generateWhsScorecard(round)
    } else {
      generateEGAScorecard(round)
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
                  onClick={() => handleDruckClick(round)}
                  className="bg-yellow-900 text-white p-2 rounded-lg hover:bg-yellow-700"
                >
                  Drucken 🖨️
              </button>
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
