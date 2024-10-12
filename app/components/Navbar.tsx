import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchBar from "./SearchBar"; // Importando a SearchBar

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex flex-wrap justify-between items-center md:flex-nowrap">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Meu Blog</h1>
        <SearchBar /> {/* Adicionando a SearchBar */}
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Início
        </Link>
        <Link href="/sobre" className="hover:text-gray-400">
          Sobre
        </Link>
        <Link href="/contato" className="hover:text-gray-400">
          Contato
        </Link>
        <Link href="/faq" className="hover:text-gray-400">
          FAQ
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
