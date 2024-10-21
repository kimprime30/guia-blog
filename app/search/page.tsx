// app/search/page.tsx

import mongoose from "mongoose";
import Post from "@/models/Post";

interface PostType {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  categories: string[];
}

const fetchPosts = async (query: string): Promise<PostType[]> => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  }).lean();

  return JSON.parse(JSON.stringify(posts));
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const posts = await fetchPosts(searchParams.query || "");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resultados da Busca</h1>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">
              {post.author} - {new Date(post.date).toLocaleDateString()}
            </p>
            <p>{post.content}</p>
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
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPage;
