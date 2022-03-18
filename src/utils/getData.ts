import axios, { AxiosResponse } from "axios";

type IQuery = string | "__popular";

export default async function getData(query: IQuery): Promise<{ data: string }> {
  switch (query) {
    case "__popular":
      await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/popular?only_eng=1&genreId=0`),
      );
      await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/popular?only_eng=1&genreId=0`),
      );
      const res: AxiosResponse = await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/popular?only_eng=1&genreId=0`),
      );
      return {
        data: res.data,
      };
    default:
      let queryString: string = query.replaceAll(" ", "+");
      await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));
      await axios.get(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));
      const { data }: AxiosResponse = await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`),
      );
      return {
        data,
      };
  }
}
