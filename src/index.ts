require("dotenv").config();

import { Telegraf } from "telegraf";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome to tmusicfy bot. For search just enter your query");
  ctx.reply("Author: @ssandry");
  ctx.reply("Made with love!");
});

bot.on("text", async (ctx) => {
  const queryString = ctx.message.text.replaceAll(" ", "%20");

  const { data }: AxiosResponse<string> = await axios.get(`https://my.mp3ha.org/search/${queryString}`);
  const $ = cheerio.load(data);
});

bot.launch();
