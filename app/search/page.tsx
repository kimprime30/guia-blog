// app/search/page.tsx

import Pagination from "../components/Pagination";
import mongoose from "mongoose";
import Post from "@/models/Post";

// Tipagem PostType agora está em uso
interface PostType {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  categories: string[];
}

const fetchPosts = async (query: string, limit: number, page: number) => {
  await mongoose.connect(process.env.MONGODB_URI!);

  const total = await Post.countDocuments({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  });

  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    posts: JSON.parse(JSON.stringify(posts)),
    total,
  };
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) => {
  const query = searchParams.query || "";
  const currentPage = parseInt(searchParams.page) || 1;
  const limit = 10; // Limite de posts por página

  const { posts, total } = await fetchPosts(query, limit, currentPage);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resultados da Busca</h1>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        posts.map((post: PostType) => (
          <div key={post._id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">
              {post.author} - {new Date(post.date).toLocaleDateString()}
            </p>
            <p>{post.content}</p>
            <div className="mt-2">
              {post.categories.map((category: string, idx: number) => (
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

      {/* Componente de Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onPageChange={(page: number) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          // Se 'page' não for necessário, comente a linha acima
        }}
      />
    </div>
  );
};

export default SearchPage;
