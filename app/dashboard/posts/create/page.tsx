"use client";

import React from "react";
import PostForm from "../../../components/PostForm";

export default function CreatePostPage() {
  const handlePostSubmit = async (
    title: string,
    content: string,
    author: string,
    categories: string[]
  ) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author, categories }),
    });

    if (res.ok) {
      console.log("Post criado com sucesso");
    } else {
      console.error("Falha ao criar o post");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar Novo Post</h1>
      <PostForm onSubmit={handlePostSubmit} />
    </div>
  );
}
