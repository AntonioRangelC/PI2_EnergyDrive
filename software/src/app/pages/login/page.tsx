"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "../../utils/axios_config";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorText, setErrorText] = useState("");

  const { toast } = useToast();

  const redirectToCellsDashboard = () => {
    router.push("/pages/ChargingHistory");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post("/pages/api/sessao", {
        email,
        senha,
      });
      if (response.status === 400 || response.status === 404) {
        setErrorText(response.data.error);
      }

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast({
          variant: "success",
          title: "Login efetuado com sucesso! 😊",
          description: "Redirecionando para página de dashboard.",
        });
        redirectToCellsDashboard();
      }
    } catch (error: any) {
      setErrorText(error.response?.data?.error || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row items-center justify-center">
      <div className="bg-white w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 gap-10">
        <div className="flex flex-col items-center w-full">
          <Image src="/img/logo_carro.png" width={150} height={150} alt="" />
          <h1 className="text-3xl font-bold text-[#0B4E65]">EnergyDrive</h1>
        </div>

        <div className="flex flex-col w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-[#0B4E65] text-center">Login</h2>

          <form className="flex flex-col gap-4 pt-4 pb-4" onSubmit={handleSubmit}>
            <Input id="email" label="Email" placeholder="Digite seu email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input id="password" label="Senha" placeholder="Digite sua senha" type="password" onChange={(e) => setSenha(e.target.value)} />
            <span className="text-customRed text-center">{errorText}</span>
            <Button className="bg-[#0B4E65] hover:bg-[#0B4E65]/90 flex items-center justify-center" type="submit" disabled={loading}>
              {loading ? <span className="animate-spin w-5 h-5 border-2 border-t-2 border-t-transparent rounded-full"></span> : "LOGIN"}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden bg-customBlue w-full lg:w-1/2 h-full lg:flex flex-col justify-center">
        <div className="flex flex-col justify-center gap-4 max-w-md mx-auto p-2 pt-8 mt-8">
          <h1 className="text-white text-3xl font-bold">Monitoramento Inteligente de Baterias</h1>
          <p className="text-sm text-white">
            Acompanhe em tempo real o desempenho das baterias do seu carro de competição. Verifique níveis de carga, temperaturas e outras informações críticas para garantir máxima performance e segurança nas pistas.
          </p>
        </div>
        <div className="flex justify-center flex-grow p-0">
          <Image src="/img/login_vector.svg" width={300} height={300} alt="" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
}
