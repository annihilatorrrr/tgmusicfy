// @ts-ignore
import translitRusEng from "translit-rus-eng";

export function rusTranslit(string: string): string {
  return translitRusEng(string, { lowerCase: true });
}

export function isRussianLang(str: string) {
  if (/[а-яА-ЯЁё]/.test(str)) {
    return true;
  }
  return false;
}
