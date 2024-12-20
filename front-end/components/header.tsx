import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useTranslation, UseTranslation } from "next-i18next";

const Header: React.FC = () => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const { locale } = router;

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
  const { t } = useTranslation();
  return (
    <header className="p-5 bg-emerald-900 w-full">
      <nav className="flex flex-col md:flex-row items-center justify-center md:space-x-14 space-y-2 md:space-y-0 w-full">
        <div className="ml-6 flex items-center">
          <label htmlFor="language" className="text-white mr-2">
            Language
          </label>
          <select
            id="language"
            className="p-1"
            value={locale}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <Link
          href="/"
          className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Home
        </Link>

        {!loggedUser ? (
          <>
            <Link
              href="/register"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.register")}
            </Link>

            <Link
              href="/users/login"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.login")}
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/users"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.users")}
            </Link>

            <Link
              href="/teams"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.teams")}
            </Link>

            <Link
              href="/tournaments"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.tournaments")}
            </Link>

            <Link
              href="/invites"
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <div className="px-7 py-2 text-xl text-white">
                {loggedUser.email}
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {t("header.logout")}
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
