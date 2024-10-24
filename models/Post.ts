import mongoose, { Schema, Document, Model } from "mongoose";

// Interface do Post
export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  date: Date;
  categories?: string[]; // Opcional
  tags?: string[]; // Opcional
  likes: number;
  views: number;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    content: { type: String, required: true, minlength: 20 },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    categories: [{ type: String, minlength: 3 }], // Opcional mas com restrição de tamanho
    tags: [{ type: String }],
    likes: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Index para melhorar performance de buscas
PostSchema.index({ title: 1 });
PostSchema.index({ author: 1 });

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
