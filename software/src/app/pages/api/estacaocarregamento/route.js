import { NextResponse } from "next/server";
import { EstacaoCarregamento } from "@/app/models/EstacaoCarregamento";
import { connectToDatabase } from "@/app/utils/mongodb";

export async function POST() {
  await connectToDatabase()
  try {
    const estaLigada = true;
    const novaEstacao = new EstacaoCarregamento({ estaLigada });
    await novaEstacao.save();

    return NextResponse.json(
      {
        message: "Nova estação cadastrada no banco de dados",
        novaEstacao: novaEstacao,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Erro ao cadastrar uma estação  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}
