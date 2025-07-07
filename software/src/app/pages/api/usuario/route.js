import { Usuario } from "../../../models/Usuario";
import { NextResponse } from "next/server";
import { encryptPassword } from "../../../utils/encrypt";
import { connectToDatabase } from "@/app/utils/mongodb";

export async function GET(req) {

  await connectToDatabase()
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return NextResponse.json(
          { error: "Usuário não encontrado", status: 404 },
          { status: 404 }
        );
      }

      return NextResponse.json({ usuario, status: 200 }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: `Erro ao buscar usuário:  ${error.message}`,
        },
        {
          status: 500,
        }
      );
    }
  }
  try {
    const usuarios = await Usuario.find();
    return NextResponse.json(
      {
        usuarios: usuarios,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao buscar usuários:  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, email, senha, cargo } = await req.json();

    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return NextResponse.json(
        {
          error: "Email já cadastrado",
        },
        {
          status: 400,
        }
      );
    }

    if (!nome || !email || !senha || !cargo) {
      return NextResponse.json(
        {
          error: "Todos os campos são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const senhaEncriptada = await encryptPassword(senha);
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaEncriptada,
      cargo,
    });
    await novoUsuario.save();

    return NextResponse.json(
      {
        novoUsuario: novoUsuario,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao criar usuario:  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, nome, email, senha, cargo } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "id é obrigatório",
        },
        {
          status: 400,
        }
      );
    }

    const updates = { nome, email, cargo };
    if (senha) {
      updates.senha = await encryptPassword(senha);
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!usuarioAtualizado) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        usuarioAtualizado: usuarioAtualizado,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao atualizar usuario:  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        error: "O ID do usuário é obrigatório.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Usuário apagado com sucesso.",
        usuario: usuarioDeletado,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao apagar usuário: ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}
