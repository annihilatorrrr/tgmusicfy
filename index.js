require("dotenv").config();

const { Telegraf } = require("telegraf");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const bot = new Telegraf(process.env.TOKEN);
const expressApp = express();

const TOKEN = process.env.TOKEN || "";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://your-heroku-app.herokuapp.com";

bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${TOKEN}`));
expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.start((ctx) => {
  ctx.reply("Welcome to TGMusicfy bot. For search just enter your query");
  ctx.reply("Author: @ssandry");
  ctx.reply("Made with love!");
});

bot.on("text", async (ctx) => {
  if (ctx.message.text !== "/start")
    try {
      const queryString = ctx.message.text.replaceAll(" ", "+");

      const { data } = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);
      const $ = cheerio.load(data);

      if ($(".list-view .audio").toArray().length > 2) {
        const audios = $(".list-view .audio").toArray().slice(0, 3);
        const performers = $(".audio .audio-artist a").toArray().slice(0, 3);
        const titles = $(".audio .col-lg-9").toArray().slice(0, 3);

        const results = audios.map((href, index) => {
          const audio = href.attribs["data-url"];
          const performer = performers[index].children[0];
          const title = titles[index].children[0].parent.children[4];

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
