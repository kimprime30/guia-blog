import { getServerSession } from "next-auth"; // Obtenção da sessão
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Opções de autenticação
import mongoose from "mongoose";
import Post from "@/models/Post";

import React from "react";
import { redirect } from "next/navigation"; // Importando redirect

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return redirect("/auth/login"); // Usando redirect corretamente
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const posts = await Post.find().lean();

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Postagens</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-6">Título</th>
              <th className="py-4 px-6">Autor</th>
              <th className="py-4 px-6">Data</th>
              <th className="py-4 px-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id.toString()}>
                {" "}
                {/* Corrigido o uso do _id como string */}
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">{post.author}</td>
                <td className="border px-4 py-2">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
