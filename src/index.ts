import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import express, { Request, Response, Express } from "express";
import startBot from "./bot";

require("dotenv").config();

const API_TOKEN: string = process.env.API_TOKEN || "";
const PORT: string | 3000 = process.env.PORT || 3000;
const URL: string = process.env.URL || "https://tgmusicfy.onrender.com//";
const bot: Telegraf<Context<Update>> = new Telegraf(process.env.TOKEN);
const expressApp: Express = express();

// bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
// expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));
expressApp.get("/", (req: Request, res: Response) => {
  res.send("TGMusicfy Bot");
});
expressApp.listen(PORT);

startBot(bot);
