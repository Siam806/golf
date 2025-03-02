import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, allowedRoles }) {
	// Benutzerdaten aus dem AuthContext holen
	const { currentUser } = useContext(authContext);

	// Ladezustand des Benutzers
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Setze den Ladezustand auf false nach 200ms
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 100);
		// Lösche den Timer, wenn die Komponente entladen wird
		return () => clearTimeout(timer);
	}, []);

	// Wenn der Benutzer noch geladen wird, zeige "Lade..." an
	if (isLoading) {
		return <p className="text-white/30 text-xl">Lade...</p>;
	}

	return allowedRoles.includes(currentUser?.userRole) ? element : <Navigate to="/" />;
}
