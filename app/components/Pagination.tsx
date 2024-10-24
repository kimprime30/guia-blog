// components/Pagination.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number; // Página atual
  totalPages: number; // Total de páginas
  onPageChange: (page: number) => void; // Função para mudar de página
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Chama a função de mudança de página
      router.push(`?page=${page}`); // Atualiza a URL com o número da nova página
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Botão para a página anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        Anterior
      </button>

      {/* Números das páginas */}
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Botão para a próxima página */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        Próxima
      </button>
    </div>
  );
}
