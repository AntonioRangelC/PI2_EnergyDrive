


import { getWhatsappClient } from '../whatsapp/session.js';


export const sendCheckMsg = async () => {
  try{
    const whatsappClient = await getWhatsappClient();

   const result =  await  whatsappClient.sendText(`5561986250932@c.us`, "Servico de Bot do Telegram e outras servicos estao funcionando corretamente")
   return true;

  }catch(error){return false;};


}

