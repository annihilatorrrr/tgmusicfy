import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

function analogsBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/analogs", async (ctx, next) => {
    try {
      await ctx.reply("Similar bots: \n @vkmusic_bot \n @Mixvk_bot");
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { analogsBotCommand };
