import { Link } from "react-router";
import { useMyContext } from "../context/Mycontext.js";

const Navbar = () => {
  const { count } = useMyContext();

  return (
    <nav className="py-4 px-8 flex justify-between items-center bg-gradient-to-r from-red-600 to-sky-600">
      <div className="font-extrabold text-3xl text-emerald-700 tracking-wide drop-shadow-lg">
        Shopping App
      </div>
      <div className="flex gap-3 items-center">
        <input
          className="py-2 px-4 rounded-full border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 shadow-sm"
          placeholder="Search products..."
        />
        <button className="py-2 px-5 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors duration-200 shadow-md">
          Search
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to="/profile"
          className="text-emerald-700 font-medium hover:underline hover:text-emerald-900 transition-colors duration-150"
        >
          Profile
        </Link>
        <Link
          to="/signup"
          className="bg-amber-400 text-emerald-900 font-semibold px-4 py-2 rounded-full hover:bg-amber-300 transition-colors duration-150 shadow"
        >
          Signup value:{count};
        </Link>
      </div>
    </nav>
  );
};

export { Navbar };
