import axios, { AxiosResponse } from "axios";

export default async function getData(ctx: any) {
  const queryString = ctx.message.text.replaceAll(" ", "+");

  const { data }: AxiosResponse<string> = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);

  return data;
}
