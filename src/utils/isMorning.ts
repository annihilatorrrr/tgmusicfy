import getRandomNumber from "./getRandomNumber";

export default function isMorning(): boolean {
  if (new Date().getHours() < 10 && new Date().getHours() > 4 && getRandomNumber(100) > 80) {
    return true;
  }
  return false;
}
