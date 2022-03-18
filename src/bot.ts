import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { startBotCommand as startCommand } from "./commands/start";
import { helpBotCommand as helpCommand } from "./commands/help";
import { textBotCommand as textHears } from "./commands/text";
import { recomendationsBotCommand as recomendationsCommand } from "./commands/recomendations";
import { topBotCommand as topCommand } from "./commands/top";
import { analogsBotCommand as analogsCommand } from "./commands/analogs";
import { sourcesBotCommand as sourcesCommand } from "./commands/sources";
import { devBotCommand as devCommand } from "./commands/dev";

export default function startBot(bot: Telegraf<Context<Update>>): void {
  [
    startCommand,
    helpCommand,
    textHears,
    recomendationsCommand,
    topCommand,
    analogsCommand,
    sourcesCommand,
    devCommand,
  ].map((command) => {
    command(bot);
  });
  bot.launch();
}
