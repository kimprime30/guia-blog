"use client";

import { useEffect, useState } from "react";
import Filter from "../components/Filter";

interface PostType {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  categories: string[];
}

// Componente BlogPage
const BlogPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect para buscar os posts da API assim que o componente é montado
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Função para aplicar filtros
  const handleFilter = (filterCriteria: {
    categories: string[];
    tags: string[];
    sortOrder: string;
  }) => {
    let filteredPosts = posts;

    // Filtragem de categorias sem diferenciar maiúsculas e minúsculas
    if (filterCriteria.categories.length > 0) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.some((category) =>
          filterCriteria.categories.some(
            (selectedCategory) =>
              category.toLowerCase() === selectedCategory.toLowerCase()
          )
        )
      );
    }

    // Adicione lógica para tags e ordenação, conforme necessário

    setPosts(filteredPosts);
  };

  // Renderização condicional para mostrar loading ou posts
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Filter onFilter={handleFilter} />
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">
            {post.author} - {new Date(post.date).toLocaleDateString()}
          </p>
          <p>{post.content}</p>
          <div className="mt-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className="text-sm bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 mr-2"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
