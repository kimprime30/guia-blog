"use client";
import React, { useState } from "react";

interface PostFormProps {
  onSubmit: (
    title: string,
    content: string,
    author: string,
    categories: string[],
    tags: string[]
  ) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");

  // Estados para mensagens de erro
  const [errorMessages, setErrorMessages] = useState({
    title: "",
    content: "",
    author: "",
    categories: "",
  });

  // Função para validar um campo específico
  const validateField = (field: keyof typeof errorMessages) => {
    const newErrors = { ...errorMessages };

    switch (field) {
      case "title":
        if (title.length < 5 || title.length > 100) {
          newErrors.title = "O título deve ter entre 5 e 100 caracteres.";
        } else {
          newErrors.title = ""; // Limpa o erro se estiver válido
        }
        break;
      case "content":
        if (content.length < 20) {
          newErrors.content = "O conteúdo deve ter pelo menos 20 caracteres.";
        } else {
          newErrors.content = ""; // Limpa o erro se estiver válido
        }
        break;
      case "author":
        if (author.trim() === "") {
          newErrors.author = "O autor não pode estar vazio.";
        } else {
          newErrors.author = ""; // Limpa o erro se estiver válido
        }
        break;
      case "categories":
        if (categories.trim() === "") {
          newErrors.categories = "As categorias não podem estar vazias.";
        } else {
          newErrors.categories = ""; // Limpa o erro se estiver válido
        }
        break;
      default:
        break;
    }

    setErrorMessages(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Checa se há erros antes de submeter
    if (Object.values(errorMessages).some((msg) => msg)) {
      return;
    }

    const categoriesArray = categories.split(",").map((cat) => cat.trim());
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    onSubmit(title, content, author, categoriesArray, tagsArray);

    // Limpa os campos
    setTitle("");
    setContent("");
    setAuthor("");
    setCategories("");
    setTags("");
    setErrorMessages({
      title: "",
      content: "",
      author: "",
      categories: "",
    });
  };

  // Função para tratar o evento onBlur
  const handleBlur = (field: keyof typeof errorMessages) => {
    validateField(field);
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      {/* Exibe a mensagem de erro apenas para o campo que tem erro */}
      {Object.values(errorMessages).some((msg) => msg) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {Object.entries(errorMessages).map(
            ([key, msg]) => msg && <div key={key}>{msg}</div>
          )}
        </div>
      )}
      <input
        className={`w-full p-2 border ${
          errorMessages.title ? "border-red-500" : "border-gray-300"
        } rounded mb-2`}
        placeholder="Título do Post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => handleBlur("title")} // Chama a validação para o campo título
      />
      <textarea
        className={`w-full p-2 border ${
          errorMessages.content ? "border-red-500" : "border-gray-300"
        } rounded mb-2`}
        placeholder="Conteúdo do Post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={() => handleBlur("content")} // Chama a validação para o campo conteúdo
      />
      <input
        className={`w-full p-2 border ${
          errorMessages.author ? "border-red-500" : "border-gray-300"
        } rounded mb-2`}
        placeholder="Autor do Post"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        onBlur={() => handleBlur("author")} // Chama a validação para o campo autor
      />
      <input
        className={`w-full p-2 border ${
          errorMessages.categories ? "border-red-500" : "border-gray-300"
        } rounded mb-2`}
        placeholder="Categorias (separe por vírgula)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        onBlur={() => handleBlur("categories")} // Chama a validação para o campo categorias
      />
      <input
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Tags (separe por vírgula)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
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
