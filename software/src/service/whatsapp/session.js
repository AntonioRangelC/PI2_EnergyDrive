import venom from 'venom-bot';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photo = '../../out.png';
const photoPath = path.join(__dirname, '../../out.png');
import statusBot from '../status/apiStatus.js'

// Rest of your code remains the same

let whatsappClient;

export const handleQRCode = async (base64Qr) => {
  try {
    const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid input string');
    }

    const response = {};
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    const imageBuffer = response;

    await new Promise((resolve, reject) => {
      fs.writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        (err) => {
          if (err != null) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    // Now, call sendQrCode after the file is written
    sendQrCode(photoPath);
  } catch (error) {
    throw error;
  }
};





export const initializeSession = () => {
  console.log("itcomes")
  return new Promise((resolve, reject) => {
    venom
      .create({
        session: 'session-name',
        headless: true,
        autoClose: 60000,
      }, (base64Qr, asciiQR, attempts, urlCode) => {
        handleQRCode(base64Qr);
      })
      .then((client) => {
        whatsappClient = client;
        console.log('WhatsApp session initialized');
        resolve(whatsappClient);
      })
      .catch((error) => {
        console.error('Error initializing WhatsApp session:', error);
        console.log("im here")
        if (whatsappClient) {
          whatsappClient.close();
        }
        reject(error);
    //    reject(error);
      });
  });
};


export const closeSession = async(req,res) =>{
  if(whatsappClient!=undefined){
    await whatsappClient.close();
    whatsappClient = undefined;
    return "Session Closed"

  }
  return "Session Already Closed"


}


export const sendQrCode = async (photoPath) => {
  try {

    const photoBuffer = fs.readFileSync(photoPath);
    statusBot.sendMessage(process.env.TELEGRAM_CHAT_ID_APISTATUS, 'QrCode');
    await statusBot.sendPhoto(
      process.env.TELEGRAM_CHAT_ID_APISTATUS,
      photoBuffer,
      { caption: 'QrCode' }
    );
   // fs.unlinkSync(photoPath);


    console.log('Photo sent successfully.');
  } catch (error) {
    console.error('Error sending photo:', error);
  }
};

//sendQrCode(photoPath);


// Function to get the initialized whatsappClient
export const getWhatsappClient = async () => {
  try{
  if (!whatsappClient) {

    await initializeSession();
  }
  return whatsappClient;}
  catch(error){
    console.log("errrp here")
    console.log(error) }
    throw error;
};

