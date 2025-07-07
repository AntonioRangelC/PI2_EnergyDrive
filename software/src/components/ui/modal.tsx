"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";;
import { Button } from "./button";

const Modal = React.forwardRef<
  HTMLDivElement,
  {
    onClose: () => void;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    displayText: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, onClose, onConfirm, displayText, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <div className="bg-white border-1 border-[#0B4E65] rounded-lg shadow-lg p-6 w-[90%] max-w-md">
      <div className="text-xl text-[#0B4E65] font-bold mb-4">
        {displayText}
      </div>
      <div className="flex justify-around pt-6">
        <Button
          className="bg-customGray text-white py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          className="bg-[#6C0E23] text-white py-2 px-4 rounded-lg"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </div>
    </div>
  </div>
));

Modal.displayName = "Modal";

const AlertModal = React.forwardRef<
  HTMLDivElement,
  {
    message: string;
    type: "success" | "error";
    onClose: () => void;
    children?: React.ReactNode; // Adicionado children
  } & React.HTMLAttributes<HTMLDivElement>
>(({ message, type, onClose, children, ...props }, ref) => {
  const textColor = type === "success" ? "text-blue-500" : "text-[#6C0E23]";

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm",
        props.className
      )}
      {...props}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-xl text-black hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="text-xl font-bold mb-4 text-center">
          <p className={textColor}>{message}</p>
        </div>

        {/* Renderizar os botões ou outros elementos passados como children */}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
});

AlertModal.displayName = "AlertModal";

interface EditModalProps {
  userId: string;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ userId, onClose }) => {
  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    novaSenha: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`/pages/api/usuario?id=${userId}`);
        const { _id, nome, email, senha, cargo, novaSenha } = response.data.usuario;
        setUsuario({ id: _id, nome, email, senha, cargo, novaSenha });
      } catch (error) {
        console.error("Erro ao buscar o usuário", error);
      }
    };

    fetchUsuario();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const usuarioAtualizado = {
        ...usuario,
        senha: usuario.novaSenha, 
      };
      await axios.put("/pages/api/usuario", usuarioAtualizado);
      onClose();
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm")}>
      <div className="bg-white border-2 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl text-[#0B4E65] font-bold mb-4">Editar Usuário</h2>
        <form>
          <label className="block mb-2">
            Nome:
            <input
              type="text"
              name="nome"
              value={usuario.nome || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={usuario.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Senha:
            <input
              type="password"
              name="senha"
              value={usuario.novaSenha || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Cargo:
            <select
              name="cargo"
              value={usuario.cargo || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </label>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#007bff] text-white py-2 px-4 rounded-lg"
            >
              Editar
            </button>
          </div>
        </form>
        <button
          className="absolute top-2 right-2 text-xl text-black hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export { Modal, AlertModal, EditModal };
