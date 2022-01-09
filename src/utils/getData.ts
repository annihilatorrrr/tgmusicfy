import axios, { AxiosResponse } from "axios";

type IQuery = string | "__popular";

export default async function getData(query: IQuery): Promise<{ data: string }> {
  switch (query) {
    case "__popular":
      const res: AxiosResponse<string> = await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/popular?only_eng=1&genreId=0`));
      return {
        data: res.data,
      };
    default:
      let queryString: string = query.replaceAll(" ", "+");
      const { data }: AxiosResponse<string> = await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));
      return {
        data,
      };
  }
}
