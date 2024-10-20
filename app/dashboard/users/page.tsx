import { getServerSession } from "next-auth"; // Obtenção da sessão
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Opções de autenticação
import mongoose from "mongoose";
import User from "@/models/User";

import React from "react";
import { redirect } from "next/navigation";

// Defina a interface para os dados do usuário
interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return redirect("/auth/login");
  }

  await mongoose.connect(process.env.MONGODB_URI!);

  // Usando o método projection do Mongoose para garantir os campos corretos
  const users = await User.find(
    {},
    { _id: 1, name: 1, email: 1, role: 1 }
  ).lean();

  // Agora tipamos o retorno explicitamente como `UserType[]`
  const typedUsers: UserType[] = users as UserType[];

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-6">Nome</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Função</th>
              <th className="py-4 px-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {typedUsers.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
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
