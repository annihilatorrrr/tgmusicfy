import axios, { AxiosResponse } from "axios";
import isRussianLang from "./isRussianLang";
import rusTranslit from "./rusTranslit";

export default async function getData(query: string): Promise<string> {
  let queryString: string;

  if (isRussianLang(query)) {
    queryString = rusTranslit(query).replaceAll(" ", "+");
  } else {
    queryString = query.replaceAll(" ", "+");
  }

  const { data }: AxiosResponse<string> = await axios.get(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`);

  return data;
}
