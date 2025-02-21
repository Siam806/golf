import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="hover:underline">
        <h1 className="text-xl font-bold">Handicalc</h1>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/ega" className="hover:underline">
            EGA
          </Link>
        </li>
        <li>
          <Link to="/whs" className="hover:underline">
            WHS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
