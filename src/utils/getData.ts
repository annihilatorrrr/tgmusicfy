import axios, { AxiosResponse } from "axios";
import { IResponse } from "../types";

type IQuery = string | "__popular";

export default async function getData(query: IQuery): Promise<IResponse> {
  switch (query) {
    case "__popular":
      const res: AxiosResponse = await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/popular?only_eng=1&genreId=0`),
      );
      return {
        data: res.data,
      };
    default:
      let queryString: string = query.replaceAll(" ", "+");
      const { data }: AxiosResponse = await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`),
      );
      return {
        data,
      };
  }
}
