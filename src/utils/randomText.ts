import getRandomNumber from "./getRandomNumber";
import { heartsEmojies, noResults, recomendations } from "../constants/";

export function getRandomHeart(): string {
  return heartsEmojies[getRandomNumber(heartsEmojies.length)];
}

export function getRandomNoResultsText(): string {
  return noResults[getRandomNumber(noResults.length)];
}

export function getRandomArtist(): string {
  return recomendations[getRandomNumber(recomendations.length)];
}
