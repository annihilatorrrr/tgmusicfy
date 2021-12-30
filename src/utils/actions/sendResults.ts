import { CheerioAPI } from "cheerio";
import createResults from "../createResults";
import { getRandomHeart, getRandomNoResultsText } from "../randomText";

export default async function sendResults($: CheerioAPI, ctx: any) {
  if ($(".list-view .audio").toArray().length > 0) {
    const promises = createResults($).map(async (result) => {
      try {
        return await ctx.replyWithAudio({ url: result.audio }, { title: result.title, performer: result.performer });
      } catch (error) {
        ctx.reply("Something went wrong when downloading the file.");
      }
    });
    Promise.all(promises).then(() => {
      ctx.reply(`Enjoy listening! ${getRandomHeart()}`);
    });
  } else {
    await ctx.reply(`${getRandomNoResultsText()}.`);
  }
}
