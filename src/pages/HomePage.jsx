import { useContext } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { availableRoles } from "../App";
import { authContext } from "../context/AuthContext";

export default function Home() {
	// Benutzerdaten aus dem AuthContext holen
	const { currentUser, login, logout } = useContext(authContext);

	// Funktion zum Speichern der Benutzerdaten
	const saveUserData = (e) => {
		e.preventDefault();
		// Benutzerdaten aus dem Formular holen
		const { userName, userRole, userEmail } = Object.fromEntries(new FormData(e.target));
		login(userName, userRole, userEmail);
	};

	// Funktion zum Löschen der Benutzerdaten
	const deleteUserData = () => {
		logout();
	};

	return (
		<div className="text-center">
			<h1 className="text-2xl font-extrabold mb-10">HANDICALC</h1>

			{!currentUser ? (
				// Formular zum Speichern der Benutzerdaten
				<form className="space-y-5" onSubmit={saveUserData}>
					<InputField required title="Wie heißt du:" name="userName" placeholder="Gib deinen Namen ein" />

					<InputField required title="Wähle deine Rolle:" name="userRole" optionsList={["-- Wähle eine Rolle --", ...availableRoles]} />

					<InputField required title="Gib deine E-Mail ein:" type="email" name="userEmail" placeholder="E-Mail-Adresse" />

					<CustomButton text="Speichern" type="submit" styles="bg-green-500" />
				</form>
			) : (
				// Anzeige der Benutzerdaten
				<div className="space-y-5 text-sm">
					<p>
						👋 Hallo, <span className="font-bold">{currentUser?.userName ?? ""}</span>!
					</p>
					<p>
						🛠 Rolle: <span className="font-bold">{currentUser?.userRole ?? ""}</span>
					</p>
					<p>
						📧 E-Mail: <span className="font-bold">{currentUser?.userEmail ?? ""}</span>
					</p>

					<CustomButton text="Daten löschen" type="button" onClick={deleteUserData} styles="bg-red-500" />
				</div>
			)}
		</div>
	);
}
