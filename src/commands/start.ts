import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { getRandomHeart } from "../utils/randomText";

function startBotCommand(bot: Telegraf<Context<Update>>) {
  bot.start(async (ctx) => {
    await ctx.reply(`Welcome, ${ctx.message.from.first_name}. \n \n To search, simply enter the name of the artist, song`);
    await ctx.reply("See /help for a list of commands");
    await ctx.reply("Author: @ssandry0");
    await ctx.reply(getRandomHeart());
  });
}

export { startBotCommand };
