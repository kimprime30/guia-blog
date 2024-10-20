"use client";

import React, { useState } from "react";

interface PostFormProps {
  onSubmit: (
    title: string,
    content: string,
    author: string,
    categories: string[]
  ) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && author.trim() && categories.trim()) {
      const categoriesArray = categories.split(",").map((cat) => cat.trim());
      onSubmit(title, content, author, categoriesArray);
      setTitle("");
      setContent("");
      setAuthor("");
      setCategories("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Título do Post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Conteúdo do Post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Autor do Post"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Categorias (separe por vírgula)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Publicar Post
      </button>
    </form>
  );
};

export default PostForm;
