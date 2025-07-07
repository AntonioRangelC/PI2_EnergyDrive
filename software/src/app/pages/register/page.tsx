"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "../../utils/axios_config";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/app/utils/auth";
import { useToast } from "@/hooks/use-toast";

function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const { toast } = useToast();

  const redirectToCellsDashboard = () => {
    router.push("/pages/cellsDashboard");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/pages/api/usuario", {
        nome,
        email,
        senha,
        cargo,
      });

      if (response.status === 400 || response.status === 404) {
        setErrorText(response.data.error);
      }

      if (response.status === 201 || response.status === 200) {
        toast({
          variant: "success",
          title: "Cadastro efetuado com sucesso! 😊",
          description: "Redirecionando para página de dashboard.",
        });
        redirectToCellsDashboard();
      }
    } catch (error: any) {
      setErrorText(error.response?.data?.error || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="bg-white flex flex-col items-center justify-center w-full lg:w-1/2 p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B4E65] text-center">
          Registrar Usuário
        </h2>

        <div className="w-full max-w-md">
          <form className="flex flex-col gap-3 pt-6 pb-4" onSubmit={handleSubmit}>
            <Input
              id="nome"
              label="Nome"
              placeholder="Digite seu nome"
              type="nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              placeholder="Digite seu email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              onChange={(e) => setSenha(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  id="cargo-admin"
                  value="ADMIN"
                  checked={cargo === "ADMIN"}
                  type="radio"
                  onChange={(e) => setCargo(e.target.value)}
                />
                Admin
              </label>
              <label className="flex items-center gap-2">
                <input
                  id="cargo-user"
                  value="USER"
                  checked={cargo === "USER"}
                  type="radio"
                  onChange={(e) => setCargo(e.target.value)}
                />
                Somente visualização
              </label>
            </div>

            {errorText && <span className="text-red-500 text-sm">{errorText}</span>}
            {successText && <span className="text-green-500 text-sm">{successText}</span>}

            <Button className="bg-[#0B4E65] hover:bg-[#0B4E65]/90 mt-2" type="submit">
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex bg-customBlue w-1/2 h-full flex-col justify-center items-center">
        <Image
          src="/img/cadastro.png"
          width={250}
          height={250}
          unoptimized={true}
          alt="Cadastro"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}

export default withAuth(Register);
