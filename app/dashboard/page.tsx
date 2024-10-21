import { getServerSession } from "next-auth"; // Obtenção da sessão do servidor
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Importação das opções de autenticação
import { redirect } from "next/navigation"; // Função de redirecionamento
import React from "react";

// Função do componente Server
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Redirecionamento se o usuário não estiver autenticado
  if (!session) {
    return redirect("/auth/login");
  }

  // Redirecionamento se o usuário não for admin
  if (session.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Painel de Administrador</h1>
        <p>Bem-vindo, {session.user.name}</p>
      </div>
    </div>
  );
}
