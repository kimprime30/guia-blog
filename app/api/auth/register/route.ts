import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já registrado." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return NextResponse.json(
      { message: "Usuário criado com sucesso." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error); // Logando o erro
    return NextResponse.json(
      { message: "Erro ao registrar usuário." },
      { status: 500 }
    );
  }
}
