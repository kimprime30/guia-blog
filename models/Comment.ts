import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  text: string;
  user: string;
  postId: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  user: { type: String, required: true },
  postId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Verifica se o modelo já foi registrado antes de criar um novo
const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
