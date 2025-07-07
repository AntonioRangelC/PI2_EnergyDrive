import TelegramBot from 'node-telegram-bot-api';
import { generateRandomMixTwelve } from './sendCode.js';


// Function to generate a new code
const makeCode = async (chatId) => {
    try {
        return `Esse Codigo \n<b>${generateRandomMixTwelve()}</b>\nEsta Valido por  minuto(s)`;
    } catch (error) {
        console.log(error);
    }
};



// Create a new Telegram bot instance
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Command to start the bot and provide initial instructions
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(parseInt(msg.chat.id, 10), "Bem Vindo manda /novoToken para Receber Novo codigo de Cadastro");
});

// Command to generate and send a new registration code
bot.onText(/\/novoToken/, async (msg) => {
    bot.sendMessage(msg.chat.id, await makeCode(String(msg.chat.id)), { parse_mode: "HTML" });
});

// Command to provide a list of available commands and their descriptions
bot.onText(/\/help/, (msg) => {
    const helpMessage = `
    Available commands:
    /start - Bem Vindo manda /novoToken para Receber Novo codigo de Cadastro
    /novoToken - Gera um novo código de registro
    /help - Lista de comandos disponíveis
    /status - Verifica o status do bot
    /sobre - Informações sobre o projeto EnergyDrive
    /chatId - Retorna o ID do chat
    `;
    bot.sendMessage(msg.chat.id, helpMessage);
});

// Command to check the status of the bot
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "O bot está funcionando corretamente.");
});

// Command to provide information about the EnergyDrive project
bot.onText(/\/sobre/, (msg) => {
    const aboutMessage = `
    EnergyDrive - Projeto de Carro para Carregamento de Baterias
    Ideia: Desenvolver um carro de carregamento e transporte para acumuladores de baterias.
    Problema: Atender às necessidades da equipe de Fórmula Elétrico da UnB na competição Fórmula SAE Brasil.
    Solução: Construir um "Accumulator Hand Cart" que atenda às normas da competição FSAE.
    `;
    bot.sendMessage(msg.chat.id, aboutMessage);
});

bot.onText(/\/chatId/, (msg) => {
    bot.sendMessage(msg.chat.id, `this is ur ChatId ${msg.chat.id}`)
});

// Handle polling errors
bot.on("polling_error", (msg) => console.log("polling error"));



let TELEGRAM_CHAT_IDS;
try {
    TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS.split(",").map(id => id.trim());
    if (TELEGRAM_CHAT_IDS.length === 0) {
        throw new Error('No chat IDs found in TELEGRAM_CHAT_IDS environment variable.');
    }
} catch (error) {
    console.error('Error parsing TELEGRAM_CHAT_IDS:', error.message);
    TELEGRAM_CHAT_IDS = [];
}

export const sendToAllChatIds = async (message) => {
    if (TELEGRAM_CHAT_IDS.length === 0) {
        console.error('No valid chat IDs to send messages to.');
        return;
    }

    try {
        TELEGRAM_CHAT_IDS.forEach(chatId => {
            bot.sendMessage(chatId, message);
        });
    } catch (error) {
        console.log(error);
    }
};


export const sendDocumentToAllChatIds = async (documentBuffer, fileName, caption) => {
    if (TELEGRAM_CHAT_IDS.length === 0) {
        console.error('No valid chat IDs to send documents to.');
        return;
    }

    try {
        TELEGRAM_CHAT_IDS.forEach(chatId => {
            bot.sendDocument(chatId, documentBuffer, { caption, fileName });
        });
    } catch (error) {
        console.log("Error sending document:", error);
    }
};

export default bot;