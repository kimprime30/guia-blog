import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose"; // Usar sua conexão MongoDB cacheada
import Post from "@/models/Post";

// Conectar ao banco antes de qualquer operação
// Isso pode ser movido para um middleware para evitar repetição

export async function GET(req: Request) {
  await dbConnect(); // Garante a conexão antes de executar a lógica

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  // Busca posts que contenham a query no título ou conteúdo
  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  }).lean(); // Utiliza .lean() para otimizar a consulta retornando objetos JavaScript simples

  return NextResponse.json(posts); // Retorna os posts em formato JSON
}

export async function POST(req: Request) {
  await dbConnect(); // Garante a conexão antes de executar a lógica

  const { title, content, author, categories, tags } = await req.json();

  // Validações
  if (title.length < 5 || title.length > 100) {
    return NextResponse.json(
      { error: "O título deve ter entre 5 e 100 caracteres." },
      { status: 400 }
    );
  }

  if (content.length < 20) {
    return NextResponse.json(
      { error: "O conteúdo deve ter pelo menos 20 caracteres." },
      { status: 400 }
    );
  }

  const newPost = new Post({ title, content, author, categories, tags });
  await newPost.save(); // Salva o novo post no MongoDB

  return NextResponse.json({ message: "Post criado com sucesso" });
}

export async function DELETE(req: Request) {
  await dbConnect(); // Garante a conexão antes de executar a lógica

  const { id } = await req.json();

  // Deleta o post pelo ID
  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deletado com sucesso" });
}

export async function PUT(req: Request) {
  await dbConnect(); // Garante a conexão antes de executar a lógica

  const { id, title, content, author, categories, tags } = await req.json();

  // Validações
  if (title.length < 5 || title.length > 100) {
    return NextResponse.json(
      { error: "O título deve ter entre 5 e 100 caracteres." },
      { status: 400 }
    );
  }

  if (content.length < 20) {
    return NextResponse.json(
      { error: "O conteúdo deve ter pelo menos 20 caracteres." },
      { status: 400 }
    );
  }

  // Atualiza o post pelo ID
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content, author, categories, tags },
    { new: true } // Retorna o documento atualizado
  ).lean();

  if (!updatedPost) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json(updatedPost); // Retorna o post atualizado
}
