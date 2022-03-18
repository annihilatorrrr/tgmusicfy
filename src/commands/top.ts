import cheerio, { CheerioAPI } from "cheerio";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { IResponse } from "../types";
import sendResults from "../utils/actions/sendResults";
import getData from "../utils/getData";

function topBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/top", async (ctx, next) => {
    try {
      await ctx.reply("🔎");

      const { data }: IResponse = await getData("__popular");
      const $: CheerioAPI = cheerio.load(data);

      await sendResults($, ctx);
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { topBotCommand };
