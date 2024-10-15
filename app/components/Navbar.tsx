"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo e Search */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Meu Blog</h1>
          <SearchBar />
        </div>
        {/* Links e ThemeSwitcher para desktop */}
        <div className="hidden md:flex items-center space-x-4">
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
          {session ? (
            <>
              <button onClick={() => signOut()} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-gray-400">
                Registrar
              </Link>
            </>
          )}
          <ThemeSwitcher />
        </div>
        {/* Menu Hamburger para Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/" className="block text-gray-400 hover:text-white">
            Início
          </Link>
          <Link href="/sobre" className="block text-gray-400 hover:text-white">
            Sobre
          </Link>
          <Link
            href="/contato"
            className="block text-gray-400 hover:text-white"
          >
            Contato
          </Link>
          <Link href="/faq" className="block text-gray-400 hover:text-white">
            FAQ
          </Link>
          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="block text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block text-gray-400 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block text-gray-400 hover:text-white"
              >
                Registrar
              </Link>
            </>
          )}
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  );
}
