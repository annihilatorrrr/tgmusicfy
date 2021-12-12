require("dotenv").config();

import { Telegraf } from "telegraf";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome to tmusicfy bot. For search just enter your query");
  ctx.reply("Author: @ssandry");
  ctx.reply("Made with love!");
});

bot.on("text", async (ctx) => {
  if (ctx.message.text !== "/start")
    try {
      const queryString = ctx.message.text.replaceAll(" ", "+");

      const { data }: AxiosResponse<string> = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);
      const $ = cheerio.load(data);

      if ($(".list-view .audio").toArray().length > 2) {
        const audios = $(".list-view .audio").toArray().slice(0, 3);
        const performers = $(".audio .audio-artist a").toArray().slice(0, 3);
        const titles = $(".audio .col-lg-9").toArray().slice(0, 3);

        const results = audios.map((href, index) => {
          const audio: string = href.attribs["data-url"];
          const performer: any = performers[index].children[0];
          const title: any = titles[index].children[0].parent.children[4];

          return {
            audio: audio,
            performer: performer.data,
            title: title.data.replace(" - ", ""),
          };
        });

        results.map((result) => {
          ctx.replyWithAudio({ url: result.audio }, { title: result.title, performer: result.performer });
        });
      } else {
        ctx.reply("Nothing came up for your query.");
        ctx.reply("☹️");
      }
    } catch (error) {
      ctx.reply("Something has gone wrong.");
      ctx.reply("🥺");
      console.log(error);
    }
});

bot.launch();