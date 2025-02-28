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

	const login = (userName, userRole, userEmail) => {
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		if (userName.trim() === "" || userRole === "" || userEmail.trim() === "") {
			// Überprüfen, ob alle Felder ausgefüllt sind
			alert("Bitte alle Felder ausfüllen!");
			return;
		} else if (knownUsers.find((user) => user.userEmail === userEmail)) {
			// Überprüfen, ob der Benutzer bereits existiert
			alert("Benutzer existiert bereits!");
			return;
		}
		// Daten des aktuellen Benutzers speichern
		localStorage.setItem("currentUser", JSON.stringify({ userName, userRole, userEmail }));
		// Aktuellen Benutzer in die Liste der bekannten Benutzer speichern
		localStorage.setItem("users", JSON.stringify([...knownUsers, { userName, userRole, userEmail }]));
		// Benutzer setzen
		setCurrentUser({ userName, userRole, userEmail });
	};

	const logout = () => {
		// Bekannte Benutzer aus dem localStorage holen
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		// Benutzer aus der Liste der bekannten Benutzer entfernen
		localStorage.setItem("users", JSON.stringify(knownUsers.filter((user) => user.userEmail !== currentUser.userEmail)));
		// Benutzerdaten löschen
		localStorage.removeItem("currentUser");
		// Benutzer auf undefined setzen
		setCurrentUser(undefined);
	};

	return <authContext.Provider value={{ currentUser, login, logout }}>{children}</authContext.Provider>;
}
