

// import { sendCheckMsg } from './whatsappStatus.js';
// import { closeSession } from '../whatsapp/session.js';
import TelegramBot from 'node-telegram-bot-api';
import bot from '../code/telegramCode.js';



  
    const token = process.env.TELEGRAM_TOKEN_APISTATUS;
    const statusBot  =  new TelegramBot(token, {polling: true});


    statusBot.onText(/.*/,(msg)=>{
        if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){
        statusBot.sendMessage(msg.chat.id, 'All possible Commands \n /start \n /checkZap \n /checkTelegram \n /StopZap \n /QrCode')
        }else{
            statusBot.sendMessage(msg.chat.id, `You are not Authorized to use this Bot ${msg.chat.id}`)
        }
    })
    
    statusBot.onText(/\/start/,(msg)=>{
        if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){
        statusBot.sendMessage(msg.chat.id,`${msg.chat.id}`)
        }
    })

    // statusBot.onText(/\/checkZap/,async (msg)=>{
    //     if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){
    //   const result =    await sendCheckMsg()
    //         if(result){
    //             statusBot.sendMessage(msg.chat.id, 'Zap is Working')
    //        }else{
    //         statusBot.sendMessage(msg.chat.id, 'Zap is not Working')
    //        }
    //     }
    // }
        
    //        )
        
    statusBot.onText(/\/checkTelegram/,(msg)=>{
        if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){
            statusBot.sendMessage(msg.chat.id, 'Telegram is Working')
            bot.sendMessage(msg.chat.id, 'Telegram is Working')
        }
    })

    // statusBot.onText(/\/StopZap/ , (msg)=>{
    //     try{
    //     if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){
    //         closeSession();
    //         statusBot.sendMessage(msg.chat.id, 'Zap is Stopped')
    //     }
    // }catch(error){ console.log(error)}
    // })

    statusBot.onText(/\/QrCode/ , (msg)=>{
        if(msg.chat.id ==  process.env.TELEGRAM_CHAT_ID_APISTATUS){

            statusBot.sendMessage(msg.chat.id, 'Zap is Started')
        }
    })

   
    


export default statusBot;


