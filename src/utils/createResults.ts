import { Element, CheerioAPI } from "cheerio";
require("dotenv").config();

interface IResult {
  audio: string;
  performer: any;
  title: any;
}

export default function createResults($: CheerioAPI): IResult[] {
  const audios: Element[] = $(".list-view .audio .download").toArray().slice(0, 5);
  const performers: Element[] = $(".audio .audio-artist a").toArray().slice(0, 5);
  const titles: Element[] = $(".audio .col-lg-9").toArray().slice(0, 5);
  const results: IResult[] = audios.map((link: Element, index: number) => {
    const audio: string =
      process.env.MUSIC_SOURCE +
      link.attribs["href"].replace("predownload?", "play?").replace("audio/", "");
    const performer: any = performers[index].children[0];
    const title: any = titles[index].children[0].parent.children[4];
    return {
      audio: audio,
      performer: performer.data,
      title: title.data.replace(" - ", ""),
    };
  });

  return results;
}
