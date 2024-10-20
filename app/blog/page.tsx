import mongoose from "mongoose";
import Post from "../../models/Post";

interface PostProps {
  posts: PostType[];
}

interface PostType {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  categories: string[];
}

const fetchPosts = async (): Promise<PostType[]> => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const posts = await Post.find().lean();
  return JSON.parse(JSON.stringify(posts));
};

const BlogPage: React.FC<PostProps> = async () => {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.map((post, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
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
      ))}
    </div>
  );
};

export default BlogPage;
