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
  [
    startBotCommand,
    helpBotCommand,
    textBotCommand,
    recomendationsBotCommand,
    topBotCommand,
    analogsBotCommand,
    sourcesBotCommand,
    devBotCommand,
  ].map((command) => {
    command(bot);
  });
  bot.launch();
}
