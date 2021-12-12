require("dotenv").config();

import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome to tmusicfy bot. For search just enter your query");
  ctx.reply("Author: @ssandry");
  ctx.reply("Made with love!");
});

bot.launch();
