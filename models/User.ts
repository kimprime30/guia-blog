import mongoose from "mongoose";

// Definição do esquema do usuário
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Senha deve ser do tipo string
    role: { type: String, default: "user" }, // 'admin' ou 'user'
  },
  { timestamps: true } // Inclui os campos createdAt e updatedAt automaticamente
);

// Criação do modelo
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
