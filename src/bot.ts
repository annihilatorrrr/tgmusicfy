import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { startBotCommand } from "./commands/start";
import { helpBotCommand } from "./commands/help";
import { textBotCommand } from "./commands/text";
import { recomendationsBotCommand } from "./commands/recomendations";
import { topBotCommand } from "./commands/top";
import { analogsBotCommand } from "./commands/analogs";
import { sourcesBotCommand } from "./commands/sources";
import { devBotCommand } from "./commands/dev";

export default function startBot(bot: Telegraf<Context<Update>>): void {
  startBotCommand(bot);
  helpBotCommand(bot);
  textBotCommand(bot);
  recomendationsBotCommand(bot);
  topBotCommand(bot);
  analogsBotCommand(bot);
  sourcesBotCommand(bot);
  devBotCommand(bot);
  bot.launch();
}
