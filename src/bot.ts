import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import cheerio, { CheerioAPI } from "cheerio";
import createResults from "./utils/createResults";
import getData from "./utils/getData";
import isMorning from "./utils/isMorning";
import { getRandomHeart, getRandomGoodMorningText, getRandomNoResultsText, getRandomGoodMorningEmoji } from "./utils/randomText";

export default function startBot(bot: Telegraf<Context<Update>>) {
  bot.start(async (ctx) => {
    await ctx.reply(`Welcome, ${ctx.message.from.first_name}. For search just enter your query`);
    await ctx.reply("Author: @ssandry0");
    await ctx.reply(getRandomHeart());
  });

  bot.on("text", async (ctx, next) => {
    if (ctx.message.text[0] !== "/") {
      const isCurrentTimeMorning: boolean = isMorning();

      try {
        await ctx.reply("🔎");

        const data: string = await getData(ctx);
        const $: CheerioAPI = cheerio.load(data);

        if ($(".list-view .audio").toArray().length > 1) {
          const promises = createResults($).map(async (result) => {
            try {
              return await ctx.replyWithAudio({ url: result.audio }, { title: result.title, performer: result.performer });
            } catch (error) {
              ctx.reply("Something went wrong when downloading the file. 🥺");
            }
          });
          Promise.all(promises).then(() => {
            ctx.reply(
              `${isCurrentTimeMorning ? `${getRandomGoodMorningText()} ` : ""}Enjoy listening! ${
                isCurrentTimeMorning ? getRandomHeart() : getRandomGoodMorningEmoji()
              }`,
            );
          });
        } else {
          await ctx.reply(`${getRandomNoResultsText()} 🥺`);
        }
      } catch (error) {
        await ctx.reply("Something has gone wrong. 🥺");
      }
    }

    return next();
  });

  bot.launch();
}
