// pages/api/status.js
import { NextResponse } from "next/server";
import bot from "../../../../../service/code/telegramCode";
import statusBot from "../../../../../service/status/apiStatus";
import { connectToDatabase } from "@/app/utils/mongodb";
export async function GET(req,res) {
    await connectToDatabase()
    try {
         bot.sendMessage(process.env.TELEGRAM_CHAT_ID_APISTATUS, "O bot está funcionando corretamente.");
        //  statusBot.sendMessage(process.env.TELEGRAM_CHAT_ID_APISTATUS, "O bot está funcionando corretamente.");
        return NextResponse.json({status: 200 ,message: "Mensagem enviada com sucesso!"});
    } catch (error) {
        return NextResponse.json(
        {
            error: `Erro ao buscar status:  ${error.message}`,
        },
        {
            status: 500,
        }
        );
    }

  
}