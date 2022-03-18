import axios, { AxiosResponse } from "axios";

type IQuery = string | "__popular";

export default async function getData(query: IQuery): Promise<{ data: string }> {
  let testCounter = 0;
  const testLimit = 10;
  async function testQuery(query: string) {
    if (testCounter <= testLimit) {
      await axios.get(encodeURI(query));
      testCounter = testCounter + 1;
      testQuery(query);
    }
  }
  switch (query) {
    case "__popular":
      await testQuery(
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
      await testQuery(encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`));
      const { data }: AxiosResponse = await axios.get(
        encodeURI(`${process.env.MUSIC_SOURCE}/search?q=${queryString}`),
      );
      return {
        data,
      };
  }
}
