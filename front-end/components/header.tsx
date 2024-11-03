import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-red-50 text-3xl text-gray-300">
        Tournamentz
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Home
        </Link>

        <Link
          href="/users"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Users
        </Link>

        <Link
          href="/register"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
