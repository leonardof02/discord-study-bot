import {
  ArchivedStudySession,
  StudySessionData,
} from "../db/ArchivedStudySession";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import DbConnection from "../db/DbConnection";
import { getSubject } from "../constants/Subjects";

export const activeStudySessions: Record<string, StudySession> = {};

export function startStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  if (activeStudySessions[userId]) {
    message.channel.send(
      `Lo siento <@${userId}> ya estás estudiando ${activeStudySessions[userId].subjectName}`
    );
    return;
  }

  const subjectName = getSubject(args.join(" "));

  if (args[0] == null || subjectName == null) {
    message.channel.send(
      `No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``
    );
    return;
  }

  activeStudySessions[userId] = {
    totalTime: 0,
    startTime: Date.now(),
    subjectName,
    points: 0,
  };

  message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`);
}

export function startGeneralStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  if (activeStudySessions[userId]) {
    message.channel.send(
      `Lo siento <@${userId}> ya estás estudiando ${activeStudySessions[userId].subjectName}`
    );
    return;
  }

  activeStudySessions[userId] = {
    totalTime: 0,
    startTime: Date.now(),
    subjectName: "de forma general",
    points: 0,
  };

  message.channel.send(
    `⏲️ <@${userId}> comenzaste a estudiar de forma general`
  );
}

export async function endStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;
  if (!activeStudySessions[userId]) {
    message.channel.send(
      `<@${userId}> no has iniciado ninguna sesión de estudio`
    );
    return;
  }

  const totalTime = Date.now() - activeStudySessions[userId].startTime;
  const finishedStudySessionData: StudySessionData = {
    totalTime,
    subjectName: activeStudySessions[userId].subjectName,
    startTime: activeStudySessions[userId].startTime,
    points:
      Math.round(
        ((Date.now() - activeStudySessions[userId].startTime) / (1000 * 60)) *
          100
      ) / 100,
    humanReadableTotalTime: msToTime(totalTime),
    userId: message.author.id,
  };

  (await ArchivedStudySession.create(finishedStudySessionData)).save();
  delete activeStudySessions[userId];

  message.channel.send(
    `Terminada sesión de estudio de <@${userId}>${
      finishedStudySessionData.subjectName === "de forma general"
        ? ""
        : `🔖 Asignatura: ${finishedStudySessionData.subjectName}}`
    }
🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
💯 Puntuación obtenida: ${finishedStudySessionData.points}`
  );
}

export async function getRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const results = (await ArchivedStudySession.findAll({
    attributes: [
      "userId",
      [DbConnection.fn("SUM", DbConnection.col("points")), "totalPoints"],
    ],
    group: ["userId"],
    order: [[DbConnection.fn("SUM", DbConnection.col("points")), "DESC"]],
  })) as any[];

  const ranking: string[] = results.map((result, index) => {
    const { userId, totalPoints } = result.get({ plain: true });
    return `${index + 1} - <@${userId}> | ${totalPoints} Puntos`;
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

  const lastSessions = ArchivedStudySession.findAll({
    order: [["createdAt", "DESC"]],
    limit: numberOfSessions,
  });

  const response = (await lastSessions).map(
    (session, index) =>
      `${index + 1} <@${session.dataValues.userId}> estuvo estudiando \`${
        session.dataValues.subjectName
      }\` por un tiempo de \`${session.dataValues.humanReadableTotalTime}\``
  );

  message.channel.send(
    `📌 Últimas sesiones de estudio\n------------------------------------\n${response.join(
      "\n"
    )}`
  );
}

function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
