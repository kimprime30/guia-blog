"use client";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import Post from "../../../models/Post";
import { useState } from "react";
import axios from "axios";

interface PostProps {
  post: {
    _id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    categories: string[];
    likes?: number;
  };
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState(post.likes || 0);

  // Função para submissão de comentários
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/comments", {
      postId: post._id,
      author,
      content: comment,
    });
    setComment("");
    setAuthor("");
  };

  // Função para curtir o post
  const handleLike = async () => {
    await axios.post("/api/likes", { postId: post._id });
    setLikes(likes + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600">
        {post.author} - {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="mt-4">{post.content}</div>

      <div className="mt-2">
        {post.categories.map((category, idx) => (
          <span
            key={idx}
            className="text-sm bg-gray-200 rounded-full px-2 py-1 mr-2"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Formulário para comentários */}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {/* Botão de curtida */}
      <button
        onClick={handleLike}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Like ({likes})
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  await mongoose.connect(process.env.MONGODB_URI!);
  const post = await Post.findOne({ slug }).lean();
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
};

export default PostPage;
