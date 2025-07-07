import mongoose from "mongoose";


const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI

if (!MONGODB_URI) {
    console.log("Faltando credenciais do ENV do banco. Favor verificar .env.example", MONGODB_URI)
  
}

// Variável para garantir que a conexão não seja recriada em cada requisição
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Desativa o buffer de comandos
      useNewUrlParser: true, // Configuração para versões antigas
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Conectado ao MongoDB!");
        return mongoose;
      })
      .catch((error) => {
        console.error("Falha na conexão com MongoDB: ", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


