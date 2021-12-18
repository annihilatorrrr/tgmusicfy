export default function isRussianLang(str: string) {
  if (/[а-яА-ЯЁё]/.test(str)) {
    return true;
  }
  return false;
}
