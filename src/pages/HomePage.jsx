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
		const { userName, userRole, userEmail, userPassword } = Object.fromEntries(new FormData(e.target));
		if (isEditing) {
			edit(userName, userRole, userEmail, currentUser.userEmail, userPassword);
			setIsEditing(false);
		} else {
			if (isLogin) {
				login(userEmail, userPassword);
			} else {
				signup(userName, userRole, userEmail, userPassword);
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
					<InputField required title="Gib ein Passwort ein:" type="password" name="userPassword" placeholder="Passwort" />

					<div className="mt-4 flex flex-col items-center">
						<CustomButton text={isLogin ? "Anmelden" : "Registrieren"} type="submit" styles="bg-green-500 w-[300px]" />
						<CustomButton text={isLogin ? "zur Registrierung" : "zur Anmeldung"} type="button" onClick={() => setIsLogin(!isLogin)} styles="bg-gray-800 w-[300px] border-white border font-thin " />
					</div>
				</form>
			) : isEditing ? (
				<form className="space-y-5" onSubmit={saveUserData}>
					<InputField required defaultValue={currentUser.userName} title="Wie heißt du:" name="userName" placeholder="Gib deinen Namen ein" />
					<InputField required defaultValue={currentUser.userRole} title="Wähle deine Rolle:" name="userRole" optionsList={["-- Wähle eine Rolle --", ...availableRoles]} />
					<InputField required defaultValue={currentUser.userEmail} title="Gib deine E-Mail ein:" type="email" name="userEmail" placeholder="E-Mail-Adresse" />
					<InputField required defaultValue={currentUser.userPassword} title="Gib dein Passwort ein:" type="password" name="userPassword" placeholder="Passwort" />

					<div className="mt-4 flex flex-col items-center">
						<CustomButton text="Sichern" type="submit" styles="bg-blue-500 mt-4 w-[300px]" />
						<CustomButton text="Abbrechen" type="button" onClick={() => setIsEditing(false)} styles="bg-red-500 mt-4 w-[300px]" />
					</div>
				</form>
			) : (
				// Anzeige der Benutzerdaten
				<div className="space-y-5 text-sm">
					<section className="grid grid-cols-2 justify-items-start bg-green-700/10 rounded-xl p-4 gap-x-1 gap-y-2 overflow-auto">
						<p>👋 Hallo,</p>
						<span className="font-bold">{(currentUser?.userName ?? "") + "!"}</span>
						<p>🛠 Rolle:</p>
						<span className="font-bold">{currentUser?.userRole ?? ""}</span>
						<p>📧 E-Mail:</p>
						<span className="font-bold">{currentUser?.userEmail ?? ""}</span>
					</section>
					<section className="mt-10 flex flex-col items-center gap-1">
						<CustomButton text="Bearbeiten" type="button" onClick={() => setIsEditing(!isEditing)} styles="bg-blue-500 w-[300px]" />
						<CustomButton text="Ausloggen" type="button" onClick={logout} styles="bg-red-500 w-[300px]" />
					</section>
				</div>
			)}
		</div>
	);
}
