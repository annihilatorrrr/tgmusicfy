require("dotenv").config();

import { Context, Telegraf } from "telegraf";
import express, { Request, Response, Express } from "express";
import startBot from "./bot";
import { Update } from "telegraf/typings/core/types/typegram";

const API_TOKEN = process.env.API_TOKEN || "";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://tgmusicfy.herokuapp.com/";

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.TOKEN);
const expressApp: Express = express();

bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);

expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));
expressApp.get("/", (req: Request, res: Response) => {
  res.send("TGMusicfy Bot");
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startBot(bot);
