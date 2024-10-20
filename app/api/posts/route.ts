// app/api/posts/route.ts

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";

export async function POST(req: Request) {
  const { title, content, author, categories } = await req.json();

  await mongoose.connect(process.env.MONGODB_URI!);
  const newPost = new Post({ title, content, author, categories });

  await newPost.save();

  return NextResponse.json({ message: "Post criado com sucesso" });
}
