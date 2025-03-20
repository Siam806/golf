import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext(undefined);

export function AuthContextProvider({ children }) {
	// Variable zum Speichern des aktuellen Benutzers
	const [currentUser, setCurrentUser] = useState(undefined);

	// useEffect, der beim Laden die Daten aus localStorage abruft
	useEffect(() => {
		// Benutzerdaten aus dem localStorage holen
		const user = JSON.parse(localStorage.getItem("currentUser"));
		if (user) {
			setCurrentUser(user); // Benutzer setzen, wenn er im localStorage vorhanden ist
		} else {
			setCurrentUser(undefined); // Benutzer auf undefined setzen.
		}
	}, []);

	const signup = (userName, userRole, userEmail, userPassword) => {
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		if (userName.trim() === "" || userRole.trim() === "" || userEmail.trim() === "" || userPassword.trim() === "") {
			// Überprüfen, ob alle Felder ausgefüllt sind
			alert("Bitte alle Felder ausfüllen!");
			return;
		} else if (knownUsers.find((user) => user.userEmail === userEmail)) {
			// Überprüfen, ob der Benutzer bereits existiert
			alert("Benutzer existiert bereits!");
			return;
		}
		// Daten des aktuellen Benutzers speichern
		localStorage.setItem("currentUser", JSON.stringify({ userName, userRole, userEmail, userPassword }));
		// Aktuellen Benutzer in die Liste der bekannten Benutzer speichern
		localStorage.setItem("users", JSON.stringify([...knownUsers, { userName, userRole, userEmail, userPassword }]));
		// Benutzer setzen
		setCurrentUser({ userName, userRole, userEmail, userPassword });
	};

	const login = (userEmail, userPassword) => {
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		if (userEmail.trim() === "") {
			// Überprüfen, ob eine E-Mail eingegeben wurde
			alert("Bitte eine Email eingeben!");
			return;
		} else if (userPassword.trim() === "") {
			// Überprüfen, ob ein Password eingegeben wurde
			alert("Bitte ein Password eingeben!");
		}

		const user = knownUsers.find((user) => user.userEmail === userEmail && user.userPassword === userPassword);

		if (!user) {
			// Überprüfen, ob die Credentials richtig sind
			alert("Falsche Email oder Password!");
			return;
		} else {
			// Daten des aktuellen Benutzers speichern
			localStorage.setItem("currentUser", JSON.stringify(user));
			// Benutzer setzen
			setCurrentUser(user);
		}
	};

	const edit = (userName, userRole, userEmail, currEmail, userPassword) => {
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		if (userName.trim() === "" || userRole === "" || userEmail.trim() === "" || userPassword.trim() === "") {
			// Überprüfen, ob alle Felder ausgefüllt sind
			alert("Bitte alle Felder ausfüllen!");
			return;
		} else if (knownUsers.find((user) => user.userEmail === userEmail && user.userEmail !== currEmail)) {
			// Überprüfen, ob der Benutzer bereits existiert
			alert("Benutzer existiert bereits!");
			return;
		}
		// Benutzerdaten aktualisieren
		const updatedUsers = knownUsers.map((user) => (user.userEmail === currEmail ? { userName, userRole, userEmail, userPassword } : user));
		// Benutzerdaten speichern
		localStorage.setItem("users", JSON.stringify(updatedUsers));
		// Daten des aktuellen Benutzers speichern
		localStorage.setItem("currentUser", JSON.stringify({ userName, userRole, userEmail, userPassword }));
		// Benutzer setzen
		setCurrentUser({ userName, userRole, userEmail, userPassword });
	};

	const logout = () => {
		// Benutzerdaten löschen
		localStorage.removeItem("currentUser");
		// Benutzer auf undefined setzen
		setCurrentUser(undefined);
	};

	return <authContext.Provider value={{ currentUser, signup, login, edit, logout }}>{children}</authContext.Provider>;
}
