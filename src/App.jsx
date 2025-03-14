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
		public: false,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/sd",
		title: "SD",
		element: <SDPage />,
		public: false,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/results",
		title: "Ergebnisse",
		element: <ResultsPage />,
		public: false,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/whs",
		title: "WHS",
		element: <WHSPage />,
		public: false,
		roles: [availableRoles[0], availableRoles[1]],
	},
	{
		path: "/calculated",
		title: "",
		element: <CalculatedPage />,
		public: false,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/round",
		title: "",
		element: <RoundDetailsPage />,
		public: false,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/roundEGA",
		title: "",
		element: <RoundDetailsPage_EGA />,
		public: false,
		roles: availableRoles.slice(0, 3),
	},
	{
		path: "/hcptovorgabe",
		title: "Spielvorgabe",
		element: <HCPtoVorgabePage />,
		public: false,
		roles: availableRoles[2],
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
			<Navbar />
			<div className="h-screen w-screen m-0 p-0 text-blue-50 bg-[#101217] relative flex items-center justify-center">
				<div className="absolute inset-0 bg-[url('./assets/golf-bg.jpg')] bg-center bg-cover bg-no-repeat filter blur-sm bg-black bg-opacity-50 z-0"></div>
				<main className="relative min-w-[45%] max-w-[90%] z-10 p-4 bg-green-200/20 rounded-4xl">
					<div className="min-h-[65vh] flex justify-center items-center bg-gray-900 rounded-4xl p-8 text-green-400 shadow-lg shadow-green-400 text-xs">
						<Routes>
							{routesMap.map((route, index) => (
								<Route key={index} path={route.path} element={<ProtectedRoute element={route.element} allowedRoles={route.roles} />} />
							))}
							<Route
								path="/*"
								element={
									<h1>
										404 - Seite nicht gefunden
										<Link to="/" className="mt-4 block text-center text-blue-500 font-extrabold underline text-lg active:text-gre">
											Home
										</Link>
									</h1>
								}
							/>
						</Routes>
					</div>
				</main>
			</div>
		</AuthContextProvider>
	);
}
