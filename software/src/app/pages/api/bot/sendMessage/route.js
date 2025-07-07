import { NextResponse } from "next/server";
import bot from "../../../../../service/code/telegramCode";
import { connectToDatabase } from "@/app/utils/mongodb";

export async function POST(req, res) {
    await connectToDatabase()
    try {
        const { auth, notification, status } = await req.json();

        if (auth.token !== process.env.BOT_TOKEN) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { method, details } = notification;

        const message = `Status Update:\n\nTimestamp: ${status.timestamp}\nType: ${status.type}\nMessage: ${status.message}`;

        const sendMessageToChatIds = async (chatIds, message) => {
            try {
                await Promise.all(chatIds.map(chatId => bot.sendMessage(chatId, message)));
            } catch (error) {
                console.log("Error sending message:", error);
                throw error;
            }
        };

        if (method === "telegram") {
            const { chatIds } = details.telegram;
            await sendMessageToChatIds(chatIds, message);
        } else {
            return NextResponse.json(
                {
                    error: "Invalid notification method",
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json({ status: 200, message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        return NextResponse.json(
            {
                error: `Erro ao enviar notificação: ${error.message}`,
            },
            {
                status: 500,
            }
        );
    }
}

// Sample request payload
// {
//     "auth": {
//         "token": "helloworld"
//     },
//     "notification": {
//         "method": "telegram",  
//         "details": {
//             "whatsapp": {
//                 "phoneNumber": "+1234567890"
//             },
//             "telegram": {
//                 "chatIds": ["5030042717", "5030042718"]
//             }
//         }
//     },
//     "status": {
//         "timestamp": "2025-02-02T04:48:02Z", 
//         "type": "ORDER_STATUS",
//         "message": "baterias estao funcionando certinho"
//     }
// }