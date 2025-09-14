import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { getRanking } from "../../features/points/presentation/controllers/GetRanking";
import { getUserInfo } from "../../features/points/presentation/controllers/GetUserInfo";
import { startChangeSubjectOfSession } from "../../features/sessions/presentation/controllers/messages/StartChangeSubjectOfSession";
import { confirmFinishStudySession } from "../../features/sessions/presentation/controllers/messages/ConfirmFinishStudySession";
import { createCustomChallenge } from "../../features/sessions/presentation/controllers/messages/CreateCustomChallenge";
import { createRandomChallenge } from "../../features/sessions/presentation/controllers/messages/CreateRandomChallenge";
import { deleteChallenge } from "../../features/sessions/presentation/controllers/messages/DeleteChallenge";
import { getLastSessions } from "../../features/sessions/presentation/controllers/messages/GetLastSessions";
import { startGeneralStudySession } from "../../features/sessions/presentation/controllers/interactions/StartGeneralStudySession";
import { createStudySession } from "../../features/sessions/presentation/controllers/messages/CreateStudySession";
import { BotActionRouter } from "./types/BotAction";
import { Command } from "./types/Command";
import { getRankingDetailed } from "../../features/points/presentation/controllers/GetRankingDetailed";
import { GetHelp } from "../../features/info/presentation/GetHelp";
import { startAddSubject } from "../../features/subjects/presentation/messages/StartAddSubject";
import { startDeleteSubject } from "../../features/subjects/presentation/messages/StartDeleteSubject";
import { viewSubjects } from "../../features/subjects/presentation/messages/ViewSubjects";

const actions: BotActionRouter = {

  // Sessions
  "!estudiar": createStudySession,
  "!terminar": confirmFinishStudySession,
  "!sesiones": getLastSessions,
  "!cambiar_asignatura": startChangeSubjectOfSession,

  // Information
  "!help": GetHelp,
  "!info": getUserInfo,

  // Score
  "!ranking": getRanking,
  "!ranking_detallado": getRankingDetailed,

  // Challenges
  "!reto_personalizado": createCustomChallenge,
  "!reto": createRandomChallenge,
  "!borrar_reto": deleteChallenge,

  // Subjects
  "!nueva_asignatura": startAddSubject,
  "!borrar_asignatura": startDeleteSubject,
  "!ver_asignaturas": viewSubjects,
};

export function manageCommand(
  message: OmitPartialGroupDMChannel<Message<boolean>>
) {
  const instructions = message.content.split(" ");
  const command = instructions[0] as Command;
  const args = [...instructions.slice(1)];

  if (command == null || !Object.keys(actions).includes(command)) return;
  actions[command](message, args);
}
