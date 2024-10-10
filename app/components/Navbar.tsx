import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>Meu Blog</h1>
      <div>
        <Link href="/" className="mx-2">
          Início
        </Link>
        <Link href="/sobre" className="mx-2">
          Sobre
        </Link>
        <Link href="/contato" className="mx-2">
          Contato
        </Link>
        <Link href="/faq" className="mx-2">
          FAQ
        </Link>
      </div>
    </nav>
  );
}
