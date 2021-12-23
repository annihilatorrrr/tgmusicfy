import getRandomNumber from "./getRandomNumber";
import { heartsEmojies, goodMorningTexts, noResults, goodMorningEmojies, recomendations } from "../constants/";

export function getRandomHeart(): string {
  return heartsEmojies[getRandomNumber(heartsEmojies.length)];
}

export function getRandomGoodMorningText(): string {
  return goodMorningTexts[getRandomNumber(goodMorningTexts.length)];
}

export function getRandomNoResultsText(): string {
  return noResults[getRandomNumber(noResults.length)];
}

export function getRandomGoodMorningEmoji(): string {
  return goodMorningEmojies[getRandomNumber(goodMorningEmojies.length)];
}

export function getRandomArtist(): string {
  return recomendations[getRandomNumber(recomendations.length)];
}
