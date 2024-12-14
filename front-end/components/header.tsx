import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-5 bg-emerald-900 flex flex-col items-center">
      <nav className="flex flex-col md:flex-row md:space-x-14 space-y-2 md:space-y-0">
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
          href="/register"
          className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Register
        </Link>

        <Link
          href="/teams"
          className="px-7 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Teams
        </Link>
      </nav>
    </header>
  );
};

export default Header;
