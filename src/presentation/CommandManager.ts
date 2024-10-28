import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { BotActionRouter } from "./types/BotAction";
import {
  changeSubjectOfSession,
  finishStudySession,
  getLastSessions,
  startGeneralStudySession,
  startStudySession,
} from "./controllers/StudySessionController";
import {
  getDetailedRanking,
  getRanking,
} from "./controllers/RankingController";
import { sendHelp } from "./controllers/HelpController";
import { createCustomChallenge } from "./controllers/ChallengeController";
import { Command } from "./types/Command";
import { getUserInfo } from "./controllers/UserInfoController";

const actions: BotActionRouter = {
  "!ranking": getRanking,
  "!ranking_detallado": getDetailedRanking,
  "!estudiar": startStudySession,
  "!terminar": finishStudySession,
  "!sesiones": getLastSessions,
  "!estudio_general": startGeneralStudySession,
  "!help": sendHelp,
  "!cambiar_asignatura": changeSubjectOfSession,
  "!reto_personalizado": createCustomChallenge,
  "!info": getUserInfo,
};

export function manage(message: OmitPartialGroupDMChannel<Message<boolean>>) {
  const instructions = message.content.split(" ");
  const command = instructions[0] as Command;
  const args = [...instructions.slice(1)];

  if (command == null || !Object.keys(actions).includes(command)) return;
  actions[command](message, args);
}
