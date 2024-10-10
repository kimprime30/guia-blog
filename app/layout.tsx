import "./globals.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Meu Blog",
  description: "Um blog dinâmico e moderno feito com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <SearchBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
