import axios, { AxiosResponse } from "axios";

export default async function getData(query: string): Promise<string> {
  let queryString: string = query.replaceAll(" ", "+");
  const { data }: AxiosResponse<string> = await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));
  return data;
}
