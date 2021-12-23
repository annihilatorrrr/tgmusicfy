import axios, { AxiosResponse } from "axios";
import { isRussianLang, rusTranslit } from "./rus";

export default async function getData(query: string): Promise<string> {
  let queryString: string;

  // if (isRussianLang(query)) {
  //   queryString = rusTranslit(query).replaceAll(" ", "+");
  // } else {
  //   queryString = query.replaceAll(" ", "+");
  // }

  queryString = query.replaceAll(" ", "+");

  const { data }: AxiosResponse<string> = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);

  return data;
}
