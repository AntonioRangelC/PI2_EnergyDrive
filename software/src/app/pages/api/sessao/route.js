import { Usuario } from "../../../models/Usuario";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { isPasswordValid } from "../../../utils/encrypt";
import { connectToDatabase } from "@/app/utils/mongodb";

export async function POST(req) {

  await connectToDatabase()
  
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        {
          error: "Todos os campos são obrigatórios"
        },
        {
          status: 400
        }
      );
    }

    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    

    if (!(await isPasswordValid(senha, usuario.senha))) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }

    const token = jwt.sign({}, process.env.NEXT_PUBLIC_JWT_SECRET, {
      subject: usuario._id.toString(),
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        usuario: usuario,
        message: "Login bem-sucedido",
        token: token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao fazer login:  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}
