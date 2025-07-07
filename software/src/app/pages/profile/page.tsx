"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "../../utils/axios_config";
import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/app/utils/auth";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { AlertModal, Modal } from "@/components/ui/modal";

function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedUser = jwtDecode(token);

          const userData = await fetchUser(decodedUser.sub);

          setNome(userData.usuario.nome);
          setEmail(userData.usuario.email);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchUser = async (userId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/pages/api/usuario?id=${userId}`
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.error("Erro ao buscar usuário por id");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (senha !== confirmSenha) {
      setErrorText("As senhas não coincidem.");
      toast({
        variant: "destructive",
        title: "Erro ao atualizar o perfil",
        description: "As senhas não coincidem.",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }
      const decodedUser = jwtDecode(token);

      const response = await axiosInstance.put("/pages/api/usuario", {
        id: decodedUser.sub,
        nome,
        email,
        senha,
      });

      if (response.status === 400 || response.status === 404) {
        setErrorText(response.data.error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar o perfil",
          description: response.data.error,
        });
      }

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Perfil atualizado com sucesso! 😊",
        });
        setSuccessText("Perfil atualizado com sucesso!");
        router.push("/pages/ChargingHistory");
      }
    } catch (error: any) {
      setErrorText(error.response?.data?.error || "Erro inesperado");
      toast({
        variant: "destructive",
        title: "Erro ao atualizar o perfil",
        description: error.response?.data?.error || "Erro inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }
      const decodedUser = jwtDecode(token);

      const response = await axiosInstance.delete(
        `/pages/api/usuario?id=${decodedUser.sub}`
      );

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Conta apagada com sucesso! 😊",
        });
        localStorage.removeItem("token"); // Limpar o token
        router.push("/pages/login");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao apagar conta",
          description: response.data.error,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao apagar conta",
        description: error.response?.data?.error || "Erro inesperado",
      });
    } finally {
      toggleModal();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-x-hidden">
      <div className="bg-white flex flex-col items-center justify-center w-full lg:w-1/2 p-6">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-4xl font-bold text-[#0B4E65]">Editar Perfil</h2>
        </div>

        <div className="flex flex-col w-3/4 p-6">
          <form
            className="flex flex-col gap-3 pt-4 pb-4"
            onSubmit={handleSubmit}
          >
            <Input
              id="nome"
              label="Nome"
              placeholder="Digite seu nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Senha"
              placeholder="Digite sua nova senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Input
              id="confirm-password"
              label="Confirmar Senha"
              placeholder="Confirme sua nova senha"
              type="password"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
            <span className="text-customRed">{errorText}</span>
            <span className="text-customBlue">{successText}</span>
            <Button
              className="bg-[#0B4E65] hover:bg-[#0B4E65]/90"
              type="submit"
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Salvar Alterações"}
            </Button>
          </form>
          <Button
            className="bg-red-600 hover:bg-red-700 mt-4"
            onClick={toggleModal}
          >
            Apagar Conta
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex bg-customBlue w-1/2 h-full flex-col justify-center items-center">
        <Image
          src="/img/profile.png"
          width={300}
          height={300}
          unoptimized={true}
          alt=""
        />
      </div>

      {showModal && (
        <Modal 
          onClose={toggleModal} 
          onConfirm={handleDeleteAccount} 
          displayText="Tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita"
        >
          <div>
              <button onClick={toggleModal}>Fechar Modal</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default withAuth(Profile);
