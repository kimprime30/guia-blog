// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth"; // Importando para obter a sessão do servidor
import { authOptions } from "../api/auth/[...nextauth]/route"; // Importando as opções de autenticação
import { redirect } from "next/navigation"; // Importando a função de redirecionamento
import React from "react";

// Função do componente Server
export default async function Dashboard() {
  const session = await getServerSession(authOptions); // Obtendo a sessão

  // Verifica se o usuário está autenticado
  if (!session) {
    redirect("/auth/login"); // Redireciona para a página de login
  }

  // Verifica se o usuário é administrador
  if (session.user.role !== "admin") {
    redirect("/unauthorized"); // Redireciona para uma página de erro de permissão
  }

  return (
    <div>
      <h1>Painel de Administrador</h1>
      {/* Aqui você pode acessar os dados da sessão */}
      <p>Bem-vindo, {session.user.name}</p>
    </div>
  );
}
