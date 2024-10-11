import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      message: "Conexão com o MongoDB bem-sucedida!",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao conectar ao MongoDB", error },
      { status: 500 }
    );
  }
}
