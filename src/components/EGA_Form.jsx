import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext";
import { useContext } from "react";


// Beispielhafter InputField-Stub.
// Nimm entweder deinen bestehenden InputField-Komponenten-Import
// oder ersetze diesen Code durch deine Version
function InputField({ title, value, onChange }) {
  return (
    <label className="block">
      <span className="text-white">{title}</span>
      <input
        type="text"
        className="p-2 text-white bg-gray-700 border rounded w-full mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

// ----- Hilfsfunktionen EGA-Logik -----

function getEgaCategory(hcp) {
  if (hcp < 4.5) return 1;
  else if (hcp < 11.5) return 2;
  else if (hcp < 18.5) return 3;
  else if (hcp < 26.5) return 4;
  else if (hcp < 37)  return 5;
  return 6;
}

//rundet auf
function roundHalfUp(value, decimals = 0) {
    const factor = Math.pow(10, decimals);
    // Vor-Rundung, um Floating-Fehler zu verringern
    const scaled = (value * factor).toFixed(decimals + 2);
    const numeric = parseFloat(scaled);
    const floored = Math.floor(numeric + 0.5);
    return floored / factor;
  }

// 18-Loch Playing Handicap
function playingHandicap18(hcp, courseRating, slopeRating, par) {
  const category = getEgaCategory(hcp);

  if (category < 6) {
    // Kat 1–5
    const raw = hcp * (slopeRating / 113) + (courseRating - par);
    return Math.round(roundHalfUp(raw));

  } else {
    // Kat 6
    // => hcp + (PHCP(36) - 36)
    //   PHCP(36) ~ 36*(Slope/113) + (CR - Par)
    const diff36 = (36 * (slopeRating / 113) + (courseRating - par)) - 36;
    const raw = hcp + diff36;
    return Math.round(roundHalfUp(raw));
  }
}

// 9-Loch Playing Handicap (vereinfachte EGA-Variante)
function playingHandicap9(hcp, courseRating9, slopeRating9, par9) {
  const category = getEgaCategory(hcp);

  if (category < 6) {
    // Kat 1–5
    // hcp/2 + CR - Par + (hcp*(slope/113))/2 etc. – hier etwas vereinfacht
    const raw = (hcp * (slopeRating9 / 113)) + (courseRating9 - par9);
    return Math.round(roundHalfUp(raw));
  } else {
    // Kat 6
    // => (hcp/2) + (PHCP(36,9L) - 18)
    //   PHCP(36,9L) ~ (36*(Slope/113)/2) + (CR - Par9)
    const diff36_9 = ((36 * (slopeRating9 / 113)) + (courseRating9 - par9)) - 36;
    const raw = (hcp) + diff36_9;
    return Math.round(roundHalfUp(raw));
  }
}

// Verteilt PHCP-Schläge lochweise anhand stroke index (1=schwerstes Loch).
function distributeStrokes(playingHCP, holes) {
  // Kopie sortieren nach "handicap" (der stroke index)
  const sorted = [...holes].sort((a, b) => a.handicap - b.handicap);

  const fullStrokesPerHole = Math.floor(playingHCP / holes.length);
  let remainder = playingHCP % holes.length;

  const holesWithExtra = sorted.map(h => ({
    ...h,
    extraStrokes: fullStrokesPerHole
  }));

  // Verteile remainder an die "schwersten" Löcher (stroke index klein = schwer)
  for (let i = 0; i < holesWithExtra.length; i++) {
    if (remainder > 0) {
      holesWithExtra[i].extraStrokes += 1;
      remainder--;
    } else {
      break;
    }
  }

  // Zurück in Originalreihenfolge sortieren
  holesWithExtra.sort((a, b) => a._originalIndex - b._originalIndex);
  return holesWithExtra;
}

// EGA-Stableford pro Loch: 2 + extraStrokes - (score - par), min 0
function calcStableford(holesWithExtra) {
  let total = 0;
  for (const h of holesWithExtra) {
    const points = 2 + h.extraStrokes - (h.score - h.par);
    total += points > 0 ? points : 0;
  }
  return total;
}

// Pufferzonenuntergrenze
function getBufferLower(category) {
  switch (category) {
    case 1: return 35; // Kat1: 35–36
    case 2: return 34; // Kat2: 34–36
    case 3: return 33; // Kat3: 33–36
    case 4: return 32; // Kat4: 32–36
    case 5: return 31; // Kat5: 31–36
    case 6: return 36; // Kat6 (vereinfacht)
    default: return 36;
  }
}

// Senkungsfaktor pro Punkt über Puffer in der jeweiligen Kategorie
function getSenkungFaktor(category) {
  switch (category) {
    case 1: return 0.1;
    case 2: return 0.2;
    case 3: return 0.3;
    case 4: return 0.4;
    case 5: return 0.5;
    case 6: return 1.0;
    default: return 1.0;
  }
}

// EGA-Änderung basierend auf Pufferzone und Stableford
function calcNewEgaHandicap(oldHcp, stableford, cba = 0) {
  // Falls "altes" HCP Kat6 -> cba auf 0
  const category = getEgaCategory(oldHcp);
  let effectiveCba = category === 6 ? 0 : cba;

  const lowerBuffer = getBufferLower(category); // z.B. 34, 35...
  const upperBuffer = 36; // i.d.R. 36
  let newHcp = oldHcp;

  // Puffergrenzen
  const pufferMin = lowerBuffer + effectiveCba;
  const pufferMax = upperBuffer + effectiveCba;

  // Innerhalb Puffer?
  if (stableford >= pufferMin && stableford <= pufferMax) {
    return newHcp;
  }

  // Über Puffer => Senkung
  if (stableford > pufferMax) {
    let diff = stableford - pufferMax;
    for (let i = 0; i < diff; i++) {
      const catNow = getEgaCategory(newHcp);
      newHcp -= getSenkungFaktor(catNow);
    }
    return newHcp;
  }

  // Unter Puffer => Erhöhung
  if (stableford < pufferMin) {
    let diff = pufferMin - stableford;
    // Im echten EGA max +0.1 pro Runde in Kat1–4.
    for (let i = 0; i < diff; i++) {
      newHcp += 0.1;
    }
    return newHcp;
  }

  return newHcp;
}


export default function EGAForm() {
    const [handicap, setHandicap] = useState('23.7');
    const [par, setPar] = useState('35');
    const [courseRating, setCourseRating] = useState('34.1');
    const [slopeRating, setSlopeRating] = useState('115');
    const [cba, setCba] = useState('0');        
    const [isNineHoles, setIsNineHoles] = useState(false);
    const [roundName, setRoundName] = useState(""); // Name der Runde
    const { currentUser } = useContext(authContext);

  const navigate = useNavigate();


  // Beispiel-Daten für 18 Löcher, stroke index = "handicap"
  const generateTestHoles = () => [
    { par: 3, handicap: 4, score: 4 },
    { par: 4, handicap: 16, score: 5 },
    { par: 4, handicap: 1, score: 5 },
    { par: 5, handicap: 10, score: 6 },
    { par: 4, handicap: 7, score: 6 },
    { par: 4, handicap: 13, score: 5 },
    { par: 3, handicap: 5, score: 6 },
    { par: 4, handicap: 17, score: 9 },
    { par: 4, handicap: 2, score: 5 },
    { par: 5, handicap: 11, score: 5 },
    { par: 4, handicap: 8, score: 6 },
    { par: 4, handicap: 14, score: 6 },
    { par: 3, handicap: 6, score: 5 },
    { par: 4, handicap: 18, score: 6 },
    { par: 4, handicap: 3, score: 6 },
    { par: 5, handicap: 12, score: 6 },
    { par: 4, handicap: 9, score: 5 },
    { par: 4, handicap: 15, score: 6 }

  ];

  const [holes, setHoles] = useState(
    /*Array.from({ length: 18 }, () => ({ par: "", handicap: "", score: "" })*/
    
    generateTestHoles());

  const holeCount = isNineHoles ? 9 : 18;

  // Input-Handler Loch
  const handleHoleChange = (index, field, value) => {
    const newHoles = [...holes];
    newHoles[index] = { ...newHoles[index], [field]: value };
    setHoles(newHoles);
  };

  const toggleHoleCount = () => {
    setIsNineHoles(prev => !prev);
  };

  // Hauptberechnung
  const calculateHandicap = () => {
    if (!handicap || !par || !courseRating || !slopeRating) {
      alert("Bitte alle Felder (Handicap, Par, Course Rating, Slope Rating) ausfüllen!");
      return;
    }

    const oldHcp = parseFloat(handicap);
    const parValue = parseInt(par);
    const courseRatingValue = parseFloat(courseRating);
    const slopeRatingValue = parseInt(slopeRating);
    const cbaValue = parseInt(cba) || 0;

    // Nimm nur 9 oder 18 Löcher
    const usedHoles = holes.slice(0, holeCount).map((h, i) => ({
      ...h,
      par: parseInt(h.par),
      score: parseInt(h.score),
      handicap: parseInt(h.handicap),
      _originalIndex: i
    }));

    // 1) Playing Handicap
    let phcp = 0;
    if (isNineHoles) {
      // z.B. halbes Par weitergeben -> parValue / 2
      phcp = playingHandicap9(oldHcp, courseRatingValue, slopeRatingValue, parValue);
    } else {
      phcp = playingHandicap18(oldHcp, courseRatingValue, slopeRatingValue, parValue);
    }

    // 2) EHCP-Schläge verteilen
    const holesWithExtra = distributeStrokes(phcp, usedHoles);

    // 3) Netto-Stableford
    let stableford = calcStableford(holesWithExtra);

    // 4) 9-Loch-Regel (nach altem EGA-Standard): +18 Punkte
    if (isNineHoles) {
      stableford += 18;
    }

    // 5) Handicap nach Pufferzonen, Senkung/Erhöhung anpassen
    let newHcp = calcNewEgaHandicap(oldHcp, stableford, cbaValue);

    // 6) Runden & limitieren (EGA max 54)
    newHcp = Math.min(54, Math.max(-54, newHcp));
    const finalHcp = roundHalfUp(newHcp, 1);

    //variable für Weiterleitung definieren
    const sd = calculateSD();
    
    // Weiterleiten (oder einfach alert)
    navigate('/calculated', { state: { result: finalHcp, scoreDifferential: sd, } });
  };

  const saveRound = () => {
    // Alle Nutzer aus dem Local Storage holen
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Den aktuellen Nutzer in der Liste finden
    let userIndex = users.findIndex(user => user.userEmail === currentUser.userEmail);
    
    if (userIndex === -1) {
      alert("Benutzer nicht gefunden!");
      return;
    }
  
    let userData = users[userIndex];
  
    // Sicherstellen, dass der Nutzer ein `rounds`-Array hat
    if (!userData.rounds) {
      userData.rounds = [];
    }
  
    // Überprüfen, ob der Rundenname bereits existiert
    const isDuplicate = userData.rounds.some(round => round.name === roundName);
  
    if (isDuplicate) {
      alert("Dieser Name ist bereits vergeben! Bitte wähle einen anderen.");
      return;
    }

    // Neue Runde erstellen
    const round = {
      userEmail: currentUser.userEmail,
      name: roundName || `Runde_${userData.rounds.length + 1}`, // Standardname, falls keiner eingegeben wird
      slopeRating,
      courseRating,
      par,
      holes,
      sd,
      type: "ega",
      handicap,
      isNineHoles
    };
  
    // Runde zum Nutzer hinzufügen
    userData.rounds.push(round);
  
    // Aktualisierte Nutzerdaten zurückspeichern
    users[userIndex] = userData;
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Runde gespeichert!");
    console.log(round);
  };
  
  
  
  const calculateSD = () => {
    const totalholes = holes.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    if (slopeRating && courseRating && par) {
      const sdValue = ((totalholes - courseRating) / slopeRating) * 113;
      if (sdValue < 0){
        return sdValue.toFixed(2)*-1; // Direkt zurückgeben statt `setSD` setSD(sdVal..)   

      }
      else{
        return sdValue.toFixed(2); // Direkt zurückgeben statt `setSD` setSD(sdVal..)   
      }
    } else {
      alert("Bitte alle Werte eingeben!");
    }
  };
  const sd = calculateSD();

  return (
    <div className="flex flex-col lg:flex-row  lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-yellow-400">🔢 Eingaben</h2>
        <InputField title="Bisheriges Handicap" value={handicap} onChange={setHandicap} />
        <InputField title="PAR des Golfplatzes" value={par} onChange={setPar} />
        <InputField title="Course Rating" value={courseRating} onChange={setCourseRating} />
        <InputField title="Slope Rating" value={slopeRating} onChange={setSlopeRating} />
        <InputField title="Name der Runde" type="text" value={roundName} onChange={(setRoundName)} placeholder="Gib der Runde einen Namen" />

        {/* Optional: CBA-Feld}
        <InputField title="CBA (optional)" value={cba} onChange={setCba} />*/}

        <button 
          className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-700 transition"
          onClick={toggleHoleCount}
        >
          {isNineHoles ? "Auf 18 Löcher wechseln" : "Auf 9 Löcher wechseln"}
        </button>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
        <h2 className="text-xl font-bold text-yellow-400">🏌️‍♂️ Score-Eingabe</h2>
        <div className="grid grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg">
          {holes.slice(0, holeCount).map((hole, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-white text-sm">Loch {index + 1}</span>
              <input
                type="number"
                value={hole.par}
                onChange={(e) => handleHoleChange(index, "par", e.target.value)}
                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                placeholder="Par"
              />
              <input
                type="number"
                value={hole.handicap}
                onChange={(e) => handleHoleChange(index, "handicap", e.target.value)}
                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                placeholder="HCP"
              />
              <input
                type="number"
                value={hole.score}
                onChange={(e) => handleHoleChange(index, "score", e.target.value)}
                className="p-2 text-white bg-gray-700 border rounded w-16 text-center"
                placeholder="Schläge"
              />
            </div>
          ))}
        </div>

        <button
          className="bg-green-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition"
          onClick={() => {calculateHandicap(); calculateSD(); saveRound()}}
        >
          BERECHNEN & Speichern
        </button>
     </div>
    </div>
  );
}