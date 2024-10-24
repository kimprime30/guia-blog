"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState(""); // Armazena a entrada do usuário
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Armazena o valor com debounce
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const router = useRouter();

  // Lógica de debounce para atualizar o estado debouncedQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Atualiza o valor debounced após 500ms
    }, 500); // Tempo de debounce: 500ms

    return () => {
      clearTimeout(handler); // Limpa o timeout se o usuário continuar digitando
    };
  }, [query]);

  // Função para realizar a busca ao clicar no botão
  const handleSearch = () => {
    if (debouncedQuery) {
      setLoading(true); // Define o estado de carregamento como verdadeiro
      router.push(`/search?query=${debouncedQuery}`); // Realiza a busca usando o valor debounced
      setLoading(false); // Define o estado de carregamento como falso (pode ser feito na nova página)
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Campo de entrada de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-gray-950 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Botão de busca */}
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? (
          <span className="loader">🔄</span> // Spinner ou indicador de carregamento
        ) : (
          "Buscar"
        )}
      </button>
    </div>
  );
}
