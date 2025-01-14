import cheerio, { CheerioAPI } from "cheerio";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { IResponse } from "../types";
import sendResults from "../utils/actions/sendResults";
import getData from "../utils/getData";

function textBotCommand(bot: Telegraf<Context<Update>>) {
  bot.on("text", async (ctx, next) => {
    if (ctx.message.text[0] !== "/") {
      try {
        await ctx.reply("🔎");
        const { data }: IResponse = await getData(ctx?.message?.text);
        const $: CheerioAPI = cheerio?.load(data);
        await sendResults($, ctx);
      } catch (error) {
        console.log("Something has gone wrong?");
        console.error(error);
        await ctx.reply("Something has gone wrong.");
      }
    }
    return next();
  });
}

export { textBotCommand };
