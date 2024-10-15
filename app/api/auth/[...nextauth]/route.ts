// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next"; // A importação correta para o NextAuth
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { NextAuthOptions } from "next-auth"; // Importando o tipo correto

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Credenciais inválidas");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        if (typeof user.password !== "string") {
          throw new Error("Senha armazenada inválida");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Senha inválida");
        }

        return {
          id: user._id.toString(), // Converta o ID para string
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Verifica se token.role é uma string
        session.user.role = token.role as string; // Type assertion para role
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Adiciona a role ao token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
