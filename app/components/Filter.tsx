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
  const [selectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("recent");

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
    onFilter({ categories: selectedCategories, tags: selectedTags, sortOrder });
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="flex flex-col p-4 bg-gray-200 dark:bg-gray-800"
    >
      <div>
        <h2 className="text-lg font-semibold mb-2">Filtrar por Categoria:</h2>
        <div className="flex flex-wrap">
          {["Orgânica", "Geral"].map((category) => (
            <label key={category} className="flex items-center mr-4">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Ordenar por:</h2>
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="border border-gray-300 rounded p-2"
        >
          <option value="recent">Mais Recentes</option>
          <option value="oldest">Mais Antigos</option>
          <option value="most-liked">Mais Curtidos</option>
          <option value="most-viewed">Mais Visualizados</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Aplicar Filtros
      </button>
    </form>
  );
};

export default Filter;
