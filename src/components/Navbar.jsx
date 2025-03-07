import { Link } from "react-router-dom";
import { useContext } from "react";
import { routesMap } from "../App";
import { authContext } from "../context/AuthContext";

const Navbar = () => {
	// Benutzerdaten aus dem AuthContext holen
	const { currentUser, logout } = useContext(authContext);

	// Funktion zum Ausloggen des Benutzers
	const userLogout = () => {
		logout();
	};

	return (
		<nav className="fixed top-0 left-0 z-50 w-screen bg-green-800 text-white text-sm font-bold px-5 py-3 flex justify-between items-center">
			<Link to="/" className="flex items-center gap-2 hover:underline">
				<img width="30" src="/favicon.png" alt="Favicon" />
				<h1 className="text-xl font-bold">Handicalc</h1>
			</Link>

			<div className="flex items-center gap-7">
				<ul className="flex gap-4">
					{routesMap
						.filter((r) => !!r.title && r.roles.includes(currentUser?.userRole)) // Nur zugelassene Routen anzeigen
						.map((route, index) => (
							<li key={index}>
								<Link to={route.path} className="hover:underline">
									{route.title}
								</Link>
							</li>
						))}
				</ul>
				{currentUser && (
					<button onClick={userLogout} className="flex flex-row gap-2 items-center px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:bg-red-900 active:text-white">
						👋 Hi, {currentUser.userName}!<span className="text-red-500 hover:text-red-700 active:text-red-900 material-icons">logout</span>
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
