import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/types";
import userService from "@/services/UserService";
import { log } from "console";
import Router from "next/router";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

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
            <div className="ml-6">
              <label htmlFor="language" className="text-white">
                language
              </label>
              <select
                name=""
                id="language"
                className="ml-2 p-1"
                value={locale}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="es">spanish</option>
              </select>
            </div>
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
