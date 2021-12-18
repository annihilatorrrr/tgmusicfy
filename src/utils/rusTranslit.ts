// @ts-ignore
import translitRusEng from "translit-rus-eng";

export default function rusTranslit(string: string): string {
  return translitRusEng(string, { lowerCase: true });
}
