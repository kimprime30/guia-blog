"use client";
import React, { useState } from "react";

// Definindo a interface para os critérios de filtro
interface FilterCriteria {
  categories: string[];
  tags: string[];
  sortOrder: string;
}

const Filter: React.FC<{
  onFilter: (filterCriteria: FilterCriteria) => void;
}> = ({ onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("recent");

  const categories = ["Orgânica", "Geral"]; // Adicionar mais categorias conforme necessário

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Converte categorias selecionadas para lowercase antes de enviar
    const lowercaseCategories = selectedCategories.map((cat) =>
      cat.toLowerCase()
    );
    onFilter({
      categories: lowercaseCategories,
      tags: selectedTags,
      sortOrder,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortOrder("recent");
    onFilter({ categories: [], tags: [], sortOrder: "recent" });
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="flex flex-col p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md"
    >
      {/* Categorias */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Filtrar por Categoria:</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } transition-colors duration-300 hover:bg-blue-400`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Ordenação */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Ordenar por:</h2>
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full bg-white dark:bg-gray-800"
        >
          <option value="recent">Mais Recentes</option>
          <option value="oldest">Mais Antigos</option>
          <option value="most-liked">Mais Curtidos</option>
          <option value="most-viewed">Mais Visualizados</option>
        </select>
      </div>

      {/* Botões de ação */}
      <div className="flex mt-4 gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Aplicar Filtros
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          onClick={clearFilters}
        >
          Limpar Filtros
        </button>
      </div>
    </form>
  );
};

export default Filter;
