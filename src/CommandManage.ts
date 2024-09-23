import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { BotActionRouter } from "./types/BotAction";
import {
  endStudySession,
  getLastSessions,
  getRanking,
  startGeneralStudySession,
  startStudySession,
} from "./services/StudySessionManager";

export type Command =
  | "!ranking"
  | "!estudiar"
  | "!terminar"
  | "!sesiones"
  | "!estudio_general";

const actions: BotActionRouter = {
  "!ranking": getRanking,
  "!estudiar": startStudySession,
  "!terminar": endStudySession,
  "!sesiones": getLastSessions,
  "!estudio_general": startGeneralStudySession,
};

export function manage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
  const instructions = message.content.split(" ");
  const command = instructions[0] as Command;
  const args = [...instructions.slice(1)];

  if (command == null || !Object.keys(actions).includes(command)) return;
  actions[command](message, args);
}
