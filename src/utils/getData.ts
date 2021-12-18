import axios, { AxiosResponse } from "axios";
import isRussianLang from "./isRussianLang";
import rusTranslit from "./rusTranslit";

export default async function getData(ctx: any): Promise<string> {
  let queryString: string;

  if (isRussianLang(ctx.message.text)) {
    queryString = rusTranslit(ctx.message.text).replaceAll(" ", "+");
  } else {
    queryString = ctx.message.text.replaceAll(" ", "+");
  }

  const { data }: AxiosResponse<string> = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);

  return data;
}
