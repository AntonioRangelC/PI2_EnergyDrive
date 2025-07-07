import { NextResponse } from "next/server";
import bot from "../../../../../service/code/telegramCode";

export async function POST(req, res) {
    try {
        const { auth, notification, status, file } = await req.json();

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
        const { type, content } = file;

        const message = `Status Update:\n\nTimestamp: ${status.timestamp}\nType: ${status.type}\nMessage: ${status.message}`;

        if (type !== "pdf" && type !== "csv") {
            return NextResponse.json(
                {
                    error: "Invalid file type",
                },
                {
                    status: 400,
                }
            );
        }

        const sendFile = async (chatId, content, fileName, caption) => {
            try {
                const buffer = Buffer.from(content, 'base64');
                await bot.sendDocument(chatId, buffer, { caption, fileName });
            } catch (error) {
                console.log("Error sending file:", error);
                throw error;
            }
        };

        if (method === "telegram") {
            const { chatIds } = details.telegram;
            const fileName = type === "pdf" ? "file.pdf" : "file.csv";
            await Promise.all(chatIds.map(chatId => sendFile(chatId, content, fileName, message)));
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

        return NextResponse.json({ status: 200, message: "Arquivo enviado com sucesso!" });
    } catch (error) {
        return NextResponse.json(
            {
                error: `Erro ao enviar o arquivo: ${error.message}`,
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
//         "timestamp": "2025-02-02T04:55:08Z",
//         "type": "ORDER_STATUS",
//         "message": "baterias estao funcionando certinho"
//     },
//     "file": {
//         "type": "pdf", 
//         "content": ""
//     }
// }