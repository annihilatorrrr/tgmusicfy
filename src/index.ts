import { Telegraf } from "telegraf";

const bot = new Telegraf("5062502033:AAHlmVKihcf5gbp33pqinpmqf_F7tMT6038");

bot.start((ctx) => {
  ctx.reply("Welcome to tmusicfy bot. For search just enter your query");
  ctx.reply("Author: @ssandry");
  ctx.reply("Made with love!");
});

bot.launch();
