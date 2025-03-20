import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EGAPage from "./pages/EGAPage";
import SDPage from "./pages/SDPage";
import HCPtoVorgabePage from "./pages/HCPtoVorgabePage";
import CalculatedPage from "./pages/CalculatedPage";
import ResultsPage from "./pages/ResultsPage";
import RoundDetailsPage from "./pages/RoundDetailsPage";
import RoundDetailsPage_EGA from "./pages/RoundDetailsPage_EGA";
import WHSPage from "./pages/WHSPage";
import { useEffect } from "react";
import { mockData } from "./utils/mockData";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MembersPage from "./pages/MembersPage";

// Rollen, die ein Benutzer haben kann
export const availableRoles = ["Golfer", "Spielführer", "Sekretär"];

// Konfiguration der Routen
export const routesMap = [
	{
		path: "/",
		title: "Home",
		element: <HomePage />,
		roles: [undefined, ...availableRoles], // Jeder Benutzer und ein nicht angemeldeter Benutzer kann die Startseite sehen
	},
	{
		path: "/members",
		title: "Mitglieder",
		element: <MembersPage />,
		roles: [availableRoles[1], availableRoles[2]],
	},
	{
		path: "/ega",
		title: "EGA",
		element: <EGAPage />,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/sd",
		title: "SD",
		element: <SDPage />,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/results",
		title: "Ergebnisse",
		element: <ResultsPage />,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/whs",
		title: "WHS",
		element: <WHSPage />,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/calculated",
		title: "",
		element: <CalculatedPage />,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/round",
		title: "",
		element: <RoundDetailsPage />,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/roundEGA",
		title: "",
		element: <RoundDetailsPage_EGA />,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/hcptovorgabe",
		title: "Spielvorgabe",
		element: <HCPtoVorgabePage />,
		roles: availableRoles[2],
	},
	{
		path: "/*",
		element: (
			<h1>
				404 - Seite nicht gefunden
				<Link to="/" className="mt-4 block text-center text-blue-500 font-extrabold underline text-lg active:text-gre">
					Home
				</Link>
			</h1>
		),
	},
];

export default function App() {
	// useEffect, der beim ersten Laden die Benutzerdaten speichert
	useEffect(() => {
		// Bekannte Benutzer aus dem localStorage holen
		const knownUsers = JSON.parse(localStorage.users ?? "[]");
		// E-Mails der bekannten Benutzer holen
		const knownEmails = knownUsers.map((user) => user.userEmail);
		// Neue Benutzer filtern
		const newUsers = mockData.filter((user) => !knownEmails.includes(user.userEmail));
		// Neue Benutzer in die Liste der bekannten Benutzer speichern
		localStorage.setItem("users", JSON.stringify([...knownUsers, ...newUsers]));
	}, []);

	return (
		<AuthContextProvider>
			<div className="h-screen w-full grid grid-cols-1 grid-rows-[80px_1fr] gap-4">
				<Navbar />

				<main className="mb-10 mx-10 flex items-center justify-center">
					<div className="min-w-[50%] max-w-[90%] p-10 bg-gray-900 text-center rounded-4xl shadow-lg shadow-green-400">
						<Routes>
							{routesMap.map((route, index) => (
								<Route key={index} path={route.path} element={!route.title ? route.element : <ProtectedRoute element={route.element} allowedRoles={route.roles} />} />
							))}
							<Route />
						</Routes>
					</div>
				</main>
			</div>
		</AuthContextProvider>
	);
}
