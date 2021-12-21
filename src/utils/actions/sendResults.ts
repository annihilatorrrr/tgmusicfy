import { CheerioAPI } from "cheerio";
import createResults from "../createResults";
import isMorning from "../isMorning";
import { getRandomGoodMorningEmoji, getRandomGoodMorningText, getRandomHeart, getRandomNoResultsText } from "../randomText";

export default async function sendResults($: CheerioAPI, ctx: any) {
  const isCurrentTimeMorning: boolean = isMorning();

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
}
