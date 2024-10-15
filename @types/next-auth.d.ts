// src/types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ID do usuário
      name: string | null; // Nome do usuário
      email: string | null; // Email do usuário
      role: string; // Role do usuário
      image?: string | null; // Imagem do usuário (opcional)
    };
  }

  interface User {
    id: string; // ID do usuário
    role: string; // Role do usuário
  }

  interface JWT {
    role: string; // Role do usuário no JWT
  }
}
