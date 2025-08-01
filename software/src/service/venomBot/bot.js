// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
import venom from 'venom-bot';
venom
  .create({
    session: 'session-name', //name of session
    headless:false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });

}
start();
export default start;