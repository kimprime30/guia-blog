// app/api/posts/route.ts

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";

// Conectar ao MongoDB
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export async function POST(req: Request) {
  const { title, content, author, categories } = await req.json();

  await connectDB();
  const newPost = new Post({ title, content, author, categories });

  await newPost.save();

  return NextResponse.json({ message: "Post criado com sucesso" });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  await connectDB();

  // Busca posts que contenham a query no título ou conteúdo
  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  }).lean();

  return NextResponse.json(posts);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await connectDB();

  // Deleta o post pelo ID
  await Post.findByIdAndDelete(id);

  return NextResponse.json({ message: "Post deletado com sucesso" });
}

export async function PUT(req: Request) {
  const { id, title, content, author, categories } = await req.json();

  await connectDB();

  // Atualiza o post pelo ID
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content, author, categories },
    { new: true } // Retorna o documento atualizado
  ).lean();

  if (!updatedPost) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json(updatedPost);
}
