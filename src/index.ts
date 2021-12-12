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
      const queryString = ctx.message.text.replaceAll(" ", "%20");

      const { data }: AxiosResponse<string> = await axios.get(`https://my.mp3ha.org/search/${queryString}`);
      const $ = cheerio.load(data);

      if ($(".idx3 .adv_download").length > 0) {
        const audios = $(".idx3 .adv_download").toArray().slice(0, 3);
        const performers = $(".idx3 .idxn meta").toArray().slice(0, 3);
        const titles = $(".idx3 span.idxo").toArray().slice(0, 3);

        const results = audios.map((audio, index) => {
          const title: any = titles[index].children[0];
          return {
            audio: audio.attribs.href,
            performer: performers[index].attribs.content,
            title: title.data,
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
