import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  date: Date;
  categories: string[];
  tags: string[]; // Adicionando o campo de tags
  likes: number; // Adicionando o campo de curtidas
  views: number; // Adicionando o campo de visualizações
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  categories: [{ type: String }],
  tags: [{ type: String }], // Definindo o campo de tags
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
