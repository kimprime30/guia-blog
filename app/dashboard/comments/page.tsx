import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import Comment from "@/models/Comment";
import React from "react";
import { redirect } from "next/navigation";

interface CommentType {
  _id: string;
  author: string;
  content: string;
  date: string;
  approved: boolean;
}

export default async function CommentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return redirect("/auth/login");
  }

  await mongoose.connect(process.env.MONGODB_URI!);

  const comments = await Comment.find(
    {},
    { _id: 1, author: 1, content: 1, date: 1, approved: 1 }
  ).lean();

  const typedComments: CommentType[] = comments as CommentType[];

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Gerenciamento de Comentários
        </h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-6">Autor</th>
              <th className="py-4 px-6">Comentário</th>
              <th className="py-4 px-6">Data</th>
              <th className="py-4 px-6">Aprovado</th>
              <th className="py-4 px-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {typedComments.map((comment) => (
              <tr key={comment._id}>
                <td className="border px-4 py-2">{comment.author}</td>
                <td className="border px-4 py-2">{comment.content}</td>
                <td className="border px-4 py-2">
                  {new Date(comment.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {comment.approved ? "Sim" : "Não"}
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                    Aprovar
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Rejeitar
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
