import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-5 mb-6 border-b border-gray-700 bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <h1 className="mb-3 md:mb-6 text-red-50 text-4xl font-bold">
        Tournamentz
      </h1>
      <nav className="flex flex-col md:flex-row md:space-x-14 space-y-2 md:space-y-0">
        <Link
          href="/"
          className="px-4 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Home
        </Link>

        <Link
          href="/users"
          className="px-4 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Users
        </Link>

        <Link
          href="/registration"
          className="px-4 py-2 text-xl text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
