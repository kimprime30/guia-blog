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

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
