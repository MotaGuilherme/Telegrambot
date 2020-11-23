const Telegrambot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube')


const token = '1406468642:AAElfKCDQguJl6OiAwYnV0I7jW9QJ1L2r1k';

const bot = new Telegrambot(token, { polling: true });

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if (dfResponse.intent === 'calculo 1') {
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.numero.stringValue)
        }


    bot.sendMessage(chatId, responseText);


});