"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import withAuth from "@/app/utils/auth";
import { EditModal } from "@/components/ui/modal";

interface Usuario {
  id: string;
  nome: string;
  estacoes: string[];
  acesso: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/pages/api/usuario");
        const usuariosData: Usuario[] = response.data.usuarios.map((usuario: any) => ({
          id: usuario._id,
          nome: usuario.nome,
          estacoes: usuario.estacoes || [],
          acesso: usuario.cargo,
        }));
        setUsuarios(usuariosData);
        setLoading(false)
        console.log("Usuários recebidos:", usuariosData);
      } catch (error) {
        console.error("Erro ao buscar os usuários", error);
      }
    };
  
    fetchUsuarios();
  }, []);

  if (loading) return <div className="flex justify-center items-center gap-6">Carregando...</div>;
  if (error) return <div className="flex justify-center items-center gap-6">{error}</div>;

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-[#0B4E65] mb-6 mt-6">Lista de usuários ativos</h1>
        <div className="conteiner"> 
            <table className="user-table">
            <thead>
                <tr>
                <th className="text-[#0B4E65]">Nome</th>
                <th className="text-[#0B4E65]">Estações</th>
                <th className="text-[#0B4E65]">Acesso</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario, index) => (
                <tr key={index}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.estacoes.join(", ")}</td>
                    <td>{usuario.acesso}</td>
                    <td>
                    <button
                        className="edit-button"
                        onClick={() => setSelectedUserId(usuario.id)}
                    >
                        <Image
                            src="/img/edit.png"
                            width={20}
                            height={20}
                            unoptimized={true}
                            alt=""
                        />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
      {selectedUserId && (
        <EditModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
      <style jsx>{`
        .container {
            padding: 20px;
        }
        .user-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 2px solid #0B4F6C;
            border-radius: 8px;
            overflow: hidden;
        }
        .user-table th {
            background-color: rgba(11, 79, 108, 0.2);
            text-align: left;
            padding: 8px 8px 8px 15px;
        }
        .user-table td {
            padding: 8px;
            padding-left: 15px;
            text-align: left;
        }
        .user-table tbody tr:nth-child(even) {
            background-color: rgba(11, 79, 108, 0.2);
        }
        .user-table tbody tr:nth-child(odd) {
            background-color: white;
        }
        .edit-button {
            background-color: #0B4F6C;
            color: white;
            border-radius: 14%;
            padding: 5px 10px;
            border: none;
            cursor: pointer;
        }
        .edit-button:hover {
            background-color: #0056b3;
        }
        *, :before, :after {
            border-color: rgba(11, 79, 108, 0.4)
        }
        `}</style>
    </div>
  );
};

export default withAuth(Usuarios);
