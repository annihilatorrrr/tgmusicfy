import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

function sourcesBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/sources", async (ctx, next) => {
    try {
      await ctx.reply("Source is used to search for music: https://downloadmusicvk.ru/");
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { sourcesBotCommand };
