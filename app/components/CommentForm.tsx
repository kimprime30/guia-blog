// app/components/CommentForm.tsx
import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content); // Aciona a função de envio
      setContent(""); // Limpa o formulário após o envio
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Escreva seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Comentar
      </button>
    </form>
  );
};

export default CommentForm;
