import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import cheerio, { CheerioAPI } from "cheerio";
import createResults from "./utils/createResults";
import getData from "./utils/getData";
import isMorning from "./utils/isMorning";

export default function startBot(bot: Telegraf<Context<Update>>) {
  bot.start(async (ctx) => {
    await ctx.reply(`Welcome, ${ctx.message.from.first_name}. For search just enter your query`);
    await ctx.reply("Author: @ssandry0");
    await ctx.reply("❤️");
  });

  bot.on("text", async (ctx) => {
    if (ctx.message.text[0] !== "/") {
      try {
        if (isMorning(ctx)) {
          await ctx.reply("🥱");
          setTimeout(async () => {
            await ctx.reply("Good morning 🌞");
          }, 400);
        }

        setTimeout(
          async () => {
            await ctx.reply("🔎");
          },
          isMorning(ctx) ? 1000 : 0,
        );

        const data: string = await getData(ctx);
        const $: CheerioAPI = cheerio.load(data);

        setTimeout(
          () => {
            if ($(".list-view .audio").toArray().length > 4) {
              const promises = createResults($).map(async (result) => {
                try {
                  ctx.state.lastMessageDate = new Date();
                  return await ctx.replyWithAudio({ url: result.audio }, { title: result.title, performer: result.performer });
                } catch (error) {
                  ctx.reply("Something went wrong when downloading the file. ☹️");
                }
              });
              Promise.all(promises).then(() => ctx.reply("Enjoy listening! ❤️"));
            } else {
              ctx.reply("Nothing came up for your query.");
              ctx.reply("🥺");
            }
          },
          isMorning(ctx) ? 1000 : 0,
        );
      } catch (error) {
        ctx.reply("Something has gone wrong.");
        ctx.reply("🥺");
        console.log(error);
      }
    }
  });

  bot.launch();
}
