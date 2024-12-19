import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/types";
import userService from "@/services/UserService";
import { log } from "console";

const Header: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");

    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");

    sessionStorage.removeItem("loggedInUser");

    setLoggedUser(null);
  };

  return (
    <header className="p-5 bg-emerald-900 flex flex-col items-center">
      <nav className="flex flex-col md:flex-row md:space-x-14 space-y-2 md:space-y-0">
        {!loggedUser && (
          <>
            <Link
              href="/"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              href="/register"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Register
            </Link>

            <Link
              href="/users/login"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Login
            </Link>
          </>
        )}

        {loggedUser && (
          <>
            <Link
              href="/"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              href="/users"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Users
            </Link>
            <Link
              href="/teams"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Teams
            </Link>
            <Link
              href="/tournaments"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Tournaments
            </Link>
            <div className="px-7 py-2 text-xl text-white">
              {loggedUser.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
