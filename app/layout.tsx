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
          {" "}
          {/* Envolve o layout com o SessionProvider */}
          <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Navbar global */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer /> {/* Footer global */}
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
