import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  date: Date;
  categories: string[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  categories: [{ type: String }],
});

// Evita erro ao recompilar o modelo no Next.js com HMR (Hot Module Replacement)
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
