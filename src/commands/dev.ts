import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

function devBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/dev", async (ctx, next) => {
    try {
      await ctx.reply("@tgmusicfy");
      await ctx.reply("Deployed thanks to Heroku and New-Relic");
      await ctx.reply("GitHub: https://github.com/hschhhwwwo0o/tgmusicfy");
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { devBotCommand };
