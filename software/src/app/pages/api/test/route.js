import { connectToDatabase } from "../../../utils/mongodb";

export async function GET(request) {
    try {
      // Conectando ao banco de dados
      await connectToDatabase();
  
      // Aqui você poderia acessar uma collection, mas vamos retornar uma mensagem simples
      return new Response(
        JSON.stringify({ message: "Conexão com MongoDB bem-sucedida!" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro na conexão com o MongoDB:", error.message);
  
      return new Response(
        JSON.stringify({ error: "Falha ao conectar ao MongoDB", details: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  