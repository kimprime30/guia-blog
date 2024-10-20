import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // Importa o novo wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meu Blog",
  description: "Um blog moderno e dinâmico com Next.js e Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}
      >
        <SessionProviderWrapper>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
