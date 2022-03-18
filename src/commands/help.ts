import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

function helpBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/help", async (ctx, next) => {
    try {
      await ctx.reply("Supported commands: ");
      await ctx.reply(
        "/recomedations (Or /r) - My favorite music that I'm only willing to share with you. \n /top - Popular tracks. \n /analogs - I will share with you similar bots. \n /sources - List of sources where I search for music \n /dev - About development",
      );
      await ctx.reply("To search, simply enter the name of the artist, song");
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { helpBotCommand };
