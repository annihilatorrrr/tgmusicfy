import axios, { AxiosResponse } from "axios";
import { isRussianLang, rusTranslit } from "./rus";

export default async function getData(query: string): Promise<string> {
  let queryString: string;

  queryString = query.replaceAll(" ", "+");

  const { data }: AxiosResponse<string> = await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));

  return data;
}
