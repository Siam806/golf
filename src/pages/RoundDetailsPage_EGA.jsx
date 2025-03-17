import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext";
import Mailto from "../components/Mailto";

// Beispielhafter InputField-Stub.
// Nimm hier gerne deinen eigenen InputField-Import oder ersetze dies mit deiner Version.
function InputField({ title, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className="block">
      <span className="text-white">{title}</span>
      <input
        type={type}
        className="p-2 text-white bg-gray-700 border rounded w-full mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

// ------------- Hilfsfunktionen (unverändert lassen) -------------

function getEgaCategory(hcp) {
  if (hcp < 4.5) return 1;
  else if (hcp < 11.5) return 2;
  else if (hcp < 18.5) return 3;
  else if (hcp < 26.5) return 4;
  else if (hcp < 37)  return 5;
  return 6;
}

function roundHalfUp(value, decimals = 0) {
  const factor = Math.pow(10, decimals);
  const scaled = (value * factor).toFixed(decimals + 2);
  const numeric = parseFloat(scaled);
  const floored = Math.floor(numeric + 0.5);
  return floored / factor;
}

function playingHandicap18(hcp, courseRating, slopeRating, par) {
  const category = getEgaCategory(hcp);
  if (category < 6) {
    const raw = hcp * (slopeRating / 113) + (courseRating - par);
    return Math.round(roundHalfUp(raw));
  } else {
    const diff36 = (36 * (slopeRating / 113) + (courseRating - par)) - 36;
    const raw = hcp + diff36;
    return Math.round(roundHalfUp(raw));
  }
}

function playingHandicap9(hcp, courseRating9, slopeRating9, par9) {
  const category = getEgaCategory(hcp);
  if (category < 6) {
    const raw = (hcp * (slopeRating9 / 113)) + (courseRating9 - par9);
    return Math.round(roundHalfUp(raw));
  } else {
    const diff36_9 = ((36 * (slopeRating9 / 113)) + (courseRating9 - par9)) - 36;
    const raw = (hcp) + diff36_9;
    return Math.round(roundHalfUp(raw));
  }
}

function distributeStrokes(playingHCP, holes) {
  const sorted = [...holes].sort((a, b) => a.handicap - b.handicap);
  const fullStrokesPerHole = Math.floor(playingHCP / holes.length);
  let remainder = playingHCP % holes.length;

  const holesWithExtra = sorted.map(h => ({
    ...h,
    extraStrokes: fullStrokesPerHole
  }));

  for (let i = 0; i < holesWithExtra.length; i++) {
    if (remainder > 0) {
      holesWithExtra[i].extraStrokes += 1;
      remainder--;
    } else {
      break;
    }
  }

  holesWithExtra.sort((a, b) => a._originalIndex - b._originalIndex);
  return holesWithExtra;
}

function calcStableford(holesWithExtra) {
  let total = 0;
  for (const h of holesWithExtra) {
    const points = 2 + h.extraStrokes - (h.score - h.par);
    total += points > 0 ? points : 0;
  }
  return total;
}

function getBufferLower(category) {
  switch (category) {
    case 1: return 35;
    case 2: return 34;
    case 3: return 33;
    case 4: return 32;
    case 5: return 31;
    case 6: return 36;
    default: return 36;
  }
}

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

function calcNewEgaHandicap(oldHcp, stableford, cba = 0) {
  const category = getEgaCategory(oldHcp);
  let effectiveCba = category === 6 ? 0 : cba;

  const lowerBuffer = getBufferLower(category);
  const upperBuffer = 36;
  let newHcp = oldHcp;

  const pufferMin = lowerBuffer + effectiveCba;
  const pufferMax = upperBuffer + effectiveCba;

  if (stableford >= pufferMin && stableford <= pufferMax) {
    return newHcp;
  }

  if (stableford > pufferMax) {
    let diff = stableford - pufferMax;
    for (let i = 0; i < diff; i++) {
      const catNow = getEgaCategory(newHcp);
      newHcp -= getSenkungFaktor(catNow);
    }
    return newHcp;
  }

  if (stableford < pufferMin) {
    let diff = pufferMin - stableford;
    for (let i = 0; i < diff; i++) {
      newHcp += 0.1;
    }
    return newHcp;
  }
  return newHcp;
}
// ---------------------------------------------------------------

// Dies ist die "Bearbeiten"-Seite.
// Sie läd per URL-Parameter eine Runde aus dem LocalStorage und
// ermöglicht das Bearbeiten sowie die erneute Berechnung & Speicherung.

export default function EGAEditForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Query-Parameter auslesen
  const params = new URLSearchParams(location.search);
  const roundNameParam = params.get('roundName');
  const roundEmailParam = params.get('roundEmail');

  // Auth-Kontext (falls benötigt)
  const { currentUser } = useContext(authContext);

  // States für das Formular
  const [handicap, setHandicap] = useState('');
  const [par, setPar] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('');
  const [cba, setCba] = useState('0');
  const [isNineHoles, setIsNineHoles] = useState(false);
  const [roundName, setRoundName] = useState("");
  const [holes, setHoles] = useState([]);

  // Beim ersten Rendern (oder wenn sich Param ändert) => Lade Daten
  useEffect(() => {
    if (roundNameParam && roundEmailParam) {
      // Alle Nutzer aus LocalStorage holen
      let users = JSON.parse(localStorage.getItem("users")) || [];
      // Entsprechenden Nutzer finden
      const user = users.find(u => u.userEmail === roundEmailParam);
      if (!user || !user.rounds) {
        console.warn("Kein passender Nutzer oder keine Runden vorhanden");
        return;
      }
      // Runde finden
      const existingRound = user.rounds.find(r => r.name === roundNameParam);
      if (!existingRound) {
        console.warn("Keine Runde mit diesem Namen gefunden");
        return;
      }

      // States aus der gefundenen Runde übernehmen
      setHandicap(existingRound.handicap || '0');
      setPar(existingRound.par || '0');
      setCourseRating(existingRound.courseRating || '0');
      setSlopeRating(existingRound.slopeRating || '0');
      setRoundName(existingRound.name || "");
      setIsNineHoles(!!existingRound.isNineHoles);

      // Falls Löcher vorhanden
      if (existingRound.holes && Array.isArray(existingRound.holes)) {
        setHoles(existingRound.holes);
      } else {
        // Falls nix da, leeres Array anlegen
        setHoles([]);
      }
    }
  }, [roundNameParam, roundEmailParam]);

  // Anzahl Löcher umschalten (9 <-> 18)
  const toggleHoleCount = () => {
    setIsNineHoles(prev => !prev);
  };
  const holeCount = isNineHoles ? 9 : 18;

  // Eingabefelder pro Loch
  const handleHoleChange = (index, field, value) => {
    const newHoles = [...holes];
    newHoles[index] = { ...newHoles[index], [field]: value };
    setHoles(newHoles);
  };

  // Hauptberechnung identisch wie bei "Neuanlage"
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

    const usedHoles = holes.slice(0, holeCount).map((h, i) => ({
      ...h,
      par: parseInt(h.par),
      score: parseInt(h.score),
      handicap: parseInt(h.handicap),
      _originalIndex: i
    }));

    let phcp = 0;
    if (isNineHoles) {
      phcp = playingHandicap9(oldHcp, courseRatingValue, slopeRatingValue, parValue);
    } else {
      phcp = playingHandicap18(oldHcp, courseRatingValue, slopeRatingValue, parValue);
    }

    const holesWithExtra = distributeStrokes(phcp, usedHoles);
    let stableford = calcStableford(holesWithExtra);

    if (isNineHoles) {
      stableford += 18;
    }

    let newHcp = calcNewEgaHandicap(oldHcp, stableford, cbaValue);
    newHcp = Math.min(54, Math.max(-54, newHcp));
    const finalHcp = roundHalfUp(newHcp, 1);

    // Du könntest hier noch optional den Score Differential berechnen oder was du sonst brauchst.
    // Dann zurück auf die Calculated-Seite oder woanders hin:
    // navigate('/calculated', { state: { result: finalHcp, scoreDifferential: ... } });
    
    // Optionaler Alert, damit man einen Hinweis bekommt
    alert(`Neues berechnetes Handicap: ${finalHcp}`);
    return finalHcp;
  };

  // Beispielhafte Hilfsfunktion für Score Differential (falls du die brauchst)
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

  // "Updaten" – wir überschreiben einfach die Daten im LocalStorage
  // in der gleichen Runde (selber Name), anstatt eine neue hinzuzufügen
  const updateRound = () => {
    const newHandicap = calculateHandicap(); // vorher rechnen
    if (newHandicap === undefined) return; // Abbruch falls Fehler

    // Nutzer-Liste laden
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // passenden Nutzer finden
    let userIndex = users.findIndex(u => u.userEmail === roundEmailParam);
    if (userIndex === -1) {
      alert("Benutzer nicht gefunden!");
      return;
    }
    let userData = users[userIndex];

    // Runde finden
    if (!userData.rounds) {
      alert("Keine Runden vorhanden!");
      return;
    }
    let roundIndex = userData.rounds.findIndex(r => r.name === roundNameParam);
    if (roundIndex === -1) {
      alert("Runde nicht gefunden!");
      return;
    }
    
    // Bestehende Runde updaten
    const updatedRound = {
      ...userData.rounds[roundIndex],
      // Neue Werte übernehmen
      name: roundName,           // Falls du den Namen änderst, könntest du hier was anderes machen
      handicap: newHandicap,     // das frisch berechnete
      par,
      courseRating,
      slopeRating,
      sd,
      holes,
      isNineHoles
    };
    userData.rounds[roundIndex] = updatedRound;

    // Zurückschreiben ins LocalStorage
    users[userIndex] = userData;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Runde erfolgreich aktualisiert!");

    Mailto(userData.userEmail, userData.userName, handicap, newHandicap );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-yellow-400">🔢 Eingaben (Edit-Modus)</h2>
        <InputField title="Bisheriges Handicap" value={handicap} onChange={setHandicap} />
        <InputField title="PAR des Golfplatzes" value={par} onChange={setPar} />
        <InputField title="Course Rating" value={courseRating} onChange={setCourseRating} />
        <InputField title="Slope Rating" value={slopeRating} onChange={setSlopeRating} />
        <InputField 
          title="Name der Runde" 
          type="text" 
          value={roundName} 
          onChange={setRoundName} 
          placeholder="Name der Runde" 
        />
        {/* Optional: CBA-Feld
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
          onClick={updateRound}
        >
          BERECHNEN & Updaten
        </button>
        <a
        href="/results"
        className="bg-gray-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-gray-700 transition"
      >
        Zurück zur Ergebnisübersicht
      </a>
      </div>
    </div>
  );
}