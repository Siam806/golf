import { useContext, useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { availableRoles } from "../App";
import { authContext } from "../context/AuthContext";

export default function Home() {
	// Benutzerdaten aus dem AuthContext holen
	const { currentUser, signup, login, edit, logout } = useContext(authContext);

	// Zustand zum Speichern, ob der Benutzer sich anmelden oder registrieren möchte
	const [isLogin, setIsLogin] = useState(false);

	// Zustand zum Speichern, ob der Benutzer seine Daten bearbeitet
	const [isEditing, setIsEditing] = useState(false);

	// Funktion zum Speichern der Benutzerdaten
	const saveUserData = (e) => {
		e.preventDefault();
		// Benutzerdaten aus dem Formular holen
		const { userName, userRole, userEmail } = Object.fromEntries(new FormData(e.target));
		if (isEditing) {
			edit(userName, userRole, userEmail, currentUser.userEmail);
			setIsEditing(false);
		} else {
			if (isLogin) {
				login(userEmail);
			} else {
				signup(userName, userRole, userEmail);
			}
		}
	};

	return (
		<div className="text-center">
			<h1 className="text-2xl font-extrabold mb-10">HANDICALC</h1>
			{!currentUser ? (
				// Formular zum Speichern der Benutzerdaten
				<form className="space-y-5" onSubmit={saveUserData}>
					{!isLogin && (
						<>
							<InputField required title="Wie heißt du:" name="userName" placeholder="Gib deinen Namen ein" />
							<InputField required title="Wähle deine Rolle:" name="userRole" optionsList={["-- Wähle eine Rolle --", ...availableRoles]} />
						</>
					)}

					<InputField required title="Gib deine E-Mail ein:" type="email" name="userEmail" placeholder="E-Mail-Adresse" />

					<div className="mt-4 flex flex-col">
						<CustomButton text={isLogin ? "Anmelden" : "Registrieren"} type="submit" styles="bg-green-500" />
						<CustomButton text={isLogin ? "zur Registrierung" : "zur Anmeldung"} type="button" onClick={() => setIsLogin(!isLogin)} styles="bg-gray-800 border-white border font-thin " />
					</div>
				</form>
			) : isEditing ? (
				<form className="space-y-5" onSubmit={saveUserData}>
					<InputField required defaultValue={currentUser.userName} title="Wie heißt du:" name="userName" placeholder="Gib deinen Namen ein" />
					<InputField required defaultValue={currentUser.userRole} title="Wähle deine Rolle:" name="userRole" optionsList={["-- Wähle eine Rolle --", ...availableRoles]} />
					<InputField required defaultValue={currentUser.userEmail} title="Gib deine E-Mail ein:" type="email" name="userEmail" placeholder="E-Mail-Adresse" />
					<div className="mt-4 flex flex-col">
						<CustomButton text="Sichern" type="submit" styles="bg-blue-500 mt-4" />
						<CustomButton text="Abbrechen" type="button" onClick={() => setIsEditing(false)} styles="bg-red-500 mt-4" />
					</div>
				</form>
			) : (
				// Anzeige der Benutzerdaten
				<div className="space-y-5 text-sm">
					<section className="grid grid-cols-2 justify-items-start gap-x-1 gap-y-2 overflow-auto">
						<p>👋 Hallo,</p>
						<span className="font-bold">{(currentUser?.userName ?? "") + "!"}</span>
						<p>🛠 Rolle:</p>
						<span className="font-bold">{currentUser?.userRole ?? ""}</span>
						<p>📧 E-Mail:</p>
						<span className="font-bold">{currentUser?.userEmail ?? ""}</span>
					</section>
					<section className="mt-10 flex flex-col gap-1">
						<CustomButton text="Bearbeiten" type="button" onClick={() => setIsEditing(!isEditing)} styles="bg-blue-500" />
						<CustomButton text="Ausloggen" type="button" onClick={logout} styles="bg-red-500" />
					</section>
				</div>
			)}
		</div>
	);
}
