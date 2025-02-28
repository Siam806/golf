import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, allowedRoles }) {
	// Benutzerdaten aus dem AuthContext holen
	const { currentUser } = useContext(authContext);

	// Benutzerrolle des aktuellen Benutzers holen
	const userRole = currentUser?.userRole;

	return allowedRoles.includes(userRole) ? element : <Navigate to="/unauthorized" />;
}
