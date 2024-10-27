import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { BotActionRouter } from "./types/BotAction";
import {
  finishStudySession,
  getDetailedRanking,
  getLastSessions,
  getRanking,
  startGeneralStudySession,
  startStudySession,
} from "./controllers/StudySessionController";
import { sendHelp } from "./controllers/HelpController";

export type Command =
  | "!ranking"
  | "!estudiar"
  | "!terminar"
  | "!sesiones"
  | "!estudio_general"
  | "!help"
  | "!ranking_detallado";

const actions: BotActionRouter = {
  "!ranking": getRanking,
  "!ranking_detallado": getDetailedRanking,
  "!estudiar": startStudySession,
  "!terminar": finishStudySession,
  "!sesiones": getLastSessions,
  "!estudio_general": startGeneralStudySession,
  "!help": sendHelp,
};

export function manage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
  const instructions = message.content.split(" ");
  const command = instructions[0] as Command;
  const args = [...instructions.slice(1)];

  if (command == null || !Object.keys(actions).includes(command)) return;
  actions[command](message, args);
}
