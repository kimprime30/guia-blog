import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, defina a variável MONGODB_URI no arquivo .env.local"
  );
}

// Checar se já existe um cache de conexão
let cached = global.mongoose;

// Se não existir, inicializa o cache
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Se já houver uma conexão, reutiliza-a
  if (cached.conn) {
    return cached.conn;
  }

  // Caso contrário, cria uma nova conexão
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Desativa o buffer de comandos para melhorar a performance
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Aguardar a resolução da promessa e armazenar a conexão no cache
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
