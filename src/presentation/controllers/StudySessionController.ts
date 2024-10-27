import { Message, OmitPartialGroupDMChannel } from "discord.js";

// use cases
import { StartStudySession } from "../../application/useCases/StartStudySession";
import { FinishStudySession } from "../../application/useCases/FinishStudySession";
import {
  GetDetailedStudyRanking,
  GetStudyRankingByUser,
} from "../../application/useCases/GetStudyRanking";
import { GetLastStudySessions } from "../../application/useCases/GetLastStudySessions";

import { getSubject } from "../../application/utils/SubjectRegex";

export function startStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  const subjectName = getSubject(args.join(" "));

  if (args[0] == null || subjectName == null) {
    message.channel.send(
      `No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``
    );
    return;
  }

  try {
    StartStudySession(userId, subjectName);
    message.channel.send(
      `⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`
    );
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export function startGeneralStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  try {
    StartStudySession(userId);
    message.channel.send(
      `⏲️ <@${userId}> comenzaste a estudiar de forma general`
    );
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function finishStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;
  try {
    const finishedStudySessionData = await FinishStudySession(userId);
    message.channel.send(
      `Terminada sesión de estudio de <@${userId}>${
        finishedStudySessionData.subjectName === "de forma general"
          ? ""
          : `\n🔖 Asignatura: ${finishedStudySessionData.subjectName}`
      }
🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
💯 Puntuación obtenida: ${finishedStudySessionData.points}
🔑 ID SESIÓN: ${finishedStudySessionData.id}`
    );
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function getRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const results = await GetStudyRankingByUser();

  const ranking: string[] = results.map((result, index) => {
    return `${index + 1} - <@${result.userId}> | ${result.totalPoints} Puntos`;
  });

  ranking[0] ? (ranking[0] = "🥇 " + ranking[0]) : "";
  ranking[1] ? (ranking[1] = "🥈 " + ranking[1]) : "";
  ranking[2] ? (ranking[2] = "🥉 " + ranking[2]) : "";

  message.channel.send(
    `🏆 Hall of fame\n------------------------------------\n${ranking.join(
      "\n"
    )}`
  );
}

export async function getDetailedRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const result = await GetDetailedStudyRanking();

  const ranking: string[] = Object.entries(result)
    .sort(([, subjectsA], [, subjectsB]) => {
      const totalPointsA = Object.values(subjectsA).reduce((a, b) => a + b, 0);
      const totalPointsB = Object.values(subjectsB).reduce((a, b) => a + b, 0);
      return totalPointsB - totalPointsA;
    })
    .map(([userId, subjects], index) => {
      const totalPoints = Object.values(subjects).reduce((a, b) => a + b, 0);

      const pointsString = `${totalPoints} puntos`;

      const pointsBySubjectString = Object.entries(subjects)
        .map(([subject, points]) => {
          return subject !== "de forma general"
            ? `\t\t\t▫️ ${subject}: ${points} puntos`
            : `\t\t\t▫️ Extras: ${points} puntos`;
        })
        .join("\n");

      console.log(subjects);
      console.log(pointsBySubjectString);

      return `${
        index + 1
      } - <@${userId}> (${pointsString})\n${pointsBySubjectString}`;
    });

  ranking[0] ? (ranking[0] = "🥇 " + ranking[0]) : "";
  ranking[1] ? (ranking[1] = "🥈 " + ranking[1]) : "";
  ranking[2] ? (ranking[2] = "🥉 " + ranking[2]) : "";

  message.channel.send(
    `🏆 Hall of fame\n------------------------------------\n${ranking.join(
      "\n"
    )}`
  );
}

export async function getLastSessions(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  let numberOfSessions = parseInt(args[0]);
  if (Number.isNaN(numberOfSessions)) numberOfSessions = 10;

  const lastSessions = await GetLastStudySessions(numberOfSessions);

  const response = (await lastSessions).map(
    (session, index) =>
      `${index + 1} - <@${session.dataValues.userId}> estuvo estudiando \`${
        session.dataValues.subjectName
      }\` por un tiempo de \`${
        session.dataValues.humanReadableTotalTime
      }\` \`[${session.dataValues.id}] \``
  );

  message.channel.send(
    `📌 Últimas sesiones de estudio\n------------------------------------\n${response.join(
      "\n"
    )}`
  );
}
