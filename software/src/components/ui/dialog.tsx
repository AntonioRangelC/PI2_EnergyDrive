"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

interface DialogFeedbackProps {
  type: "success" | "error"; 
  message: string; 
  open: boolean; 
  onClose: any; 
}

const DialogFeedback: React.FC<DialogFeedbackProps> = ({
  type,
  message,
  open,
  onClose,
}) => {
  const isSuccess = type === "success";

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-customGreen" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-customRed" />
            )}
            <Dialog.Title className={`text-lg font-bold ${isSuccess ? 'text-customGreen' : 'text-customRed'}`}>
                {isSuccess ? "Pronto" : "Erro"}
            </Dialog.Title>
          </div>
          <p className="mt-3 text-sm text-gray-700">{message}</p>
          <div className="mt-5 flex justify-center">
            <button
              onClick={onClose}
              className="rounded bg-customGray px-4 py-2 text-white hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
          <Dialog.Close
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogFeedback;
