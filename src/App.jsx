import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EGAPage from "./pages/EGAPage";
import SDPage from "./pages/SDPage";
import CalculatedPage from "./pages/CalculatedPage";
import ResultsPage from "./pages/ResultsPage";
import RoundDetailsPage from "./pages/RoundDetailsPage";
import WHSPage from './pages/WHSPage';
import { useEffect } from "react";
import { mockData } from './utils/mockData';


const routeConfig = [
  {
    path: "/",
    element: <HomePage />,
    roles: ['Golfer', 'Spielführer', 'Sekretär'],

  },
  {
    path: "/ega",
    element: <EGAPage />,
    roles: ['Golfer'],

  },
  {
    path: "/sd",
    element: <SDPage />,
    roles: ['Golfer'],

  },
  {
    path: "/results",
    element: <ResultsPage />,
    roles: ['Golfer'],

  },
  {
    path: "/whs",
    element: <WHSPage />,
    roles: ['Golfer'],

  },
  {
    path: "/calculated",
    element: <CalculatedPage />,
    roles: ['Golfer'],

  },
  {
    path: "/round/:roundName",
    element: <RoundDetailsPage />,
    roles: ['Golfer'],

  },
];


export default function App() {

  useEffect(() => {
    const knownUsers = JSON.parse(localStorage.users ?? '[]');
    const knownEmails = knownUsers.map(user => user.email);
    const newUsers = mockData.filter(user => !knownEmails.includes(user.email));
    localStorage.setItem('users', JSON.stringify([...knownUsers, ...newUsers]));
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen w-screen m-0 p-0 text-blue-50 bg-[#101217] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('./assets/golf-bg.jpg')] bg-center bg-cover bg-no-repeat filter blur-xs bg-black bg-opacity-50 z-0"></div>
        <main className="relative z-10 p-10 bg-white/10 backdrop-blur-lg rounded-4xl shadow-lg max-w-screen-md w-full text-center">
          <Routes>
            {routeConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </>
  );
}
