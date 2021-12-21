import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import cheerio, { CheerioAPI } from "cheerio";
import getData from "./utils/getData";
import { getRandomHeart } from "./utils/randomText";
import sendResults from "./utils/actions/sendResults";

export default function startBot(bot: Telegraf<Context<Update>>) {
  bot.start(async (ctx) => {
    await ctx.reply(`Welcome, ${ctx.message.from.first_name}. \n \n To search, simply enter the name of the artist, song`);
    await ctx.reply("See /help for a list of commands");
    await ctx.reply("Author: @ssandry0");
    await ctx.reply(getRandomHeart());
  });

  bot.hears("/help", async (ctx, next) => {
    try {
      await ctx.reply("Supported commands: ");
      await ctx.reply(
        "/recomedations - My favorite music that I'm only willing to share with you. \n /analogs - I will share with you similar bots. \n /sources - List of sources where I search for music \n /dev - About development",
      );
      await ctx.reply("To search, simply enter the name of the artist, song");
    } catch (error) {
      await ctx.reply("Something has gone wrong. 🥺");
    }
    return next();
  });

  bot.on("text", async (ctx, next) => {
    if (ctx.message.text[0] !== "/") {
      try {
        await ctx.reply("🔎");

        const data: string = await getData(ctx.message.text);
        const $: CheerioAPI = cheerio.load(data);

        await sendResults($, ctx);
      } catch (error) {
        await ctx.reply("Something has gone wrong. 🥺");
      }
    }

    return next();
  });

  bot.launch();
}
