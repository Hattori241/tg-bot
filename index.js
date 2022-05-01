const TelegramApi = require("node-telegram-bot-api");

const token = "5118777749:AAELNdG5Z-XwHD9j294rC3iafVilxki30m4";

const bot = new TelegramApi(token, { polling: true });

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Сейчас я загадаю число от 0 до 9 ");
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Угадай", gameOptions);
};
const chats = {};
const { gameOptions, againOptions } = require("./options");
const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветсвие" },
    { command: "/info", description: "получить информацию" },
    { command: "/game", description: "Игра" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "https://tlgrm.ru/_/stickers/a6f/1ae/a6f1ae15-7c57-3212-8269-f1a0231ad8c2/12.webp"
      );
      return bot.sendMessage(chatId, `Добро пожаловать`);
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю!");
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Ты угадал ${chats[chatId]}`,
        againOptions
      );
    } else {
      bot.sendMessage(
        chatId,
        `Ты не угадал, правильный ответ ${chats[chatId]}`,
        againOptions
      );
    }
  });
};
start();
