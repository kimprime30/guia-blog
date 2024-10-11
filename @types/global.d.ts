import mongoose from "mongoose";

// Definir o tipo da cache de conexão para ser reutilizada globalmente
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declaração global de 'mongoose' com a interface definida
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// Isso é necessário para que o TypeScript trate esse arquivo como um módulo
export {};
