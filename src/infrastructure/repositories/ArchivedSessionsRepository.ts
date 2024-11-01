import DbConnection from "../DbConnection";
import {
  StudySessionData,
  ArchivedStudySession,
} from "../models/ArchivedStudySession";

export async function archiveStudySession(studySession: StudySessionData) {
  const newStudySession = await ArchivedStudySession.create(studySession);
  newStudySession.save();
  return newStudySession.dataValues.id;
}

export async function getArchivedSessions() {
  const results = await ArchivedStudySession.findAll({
    attributes: [
      "userId",
      [DbConnection.fn("SUM", DbConnection.col("points")), "totalPoints"],
    ],
    group: ["userId"],
    order: [[DbConnection.fn("SUM", DbConnection.col("points")), "DESC"]],
  });

  return results;
}

export async function getPointsSumsPerUser() {
  interface AggregateResult {
    userId: string;
    totalPoints: number;
  }

  const results = await ArchivedStudySession.findAll({
    attributes: [
      "userId",
      [DbConnection.fn("SUM", DbConnection.col("points")), "totalPoints"],
    ],
    group: ["userId"],
    order: [[DbConnection.fn("SUM", DbConnection.col("points")), "DESC"]],
  });

  return results.map((item) => ({
    userId: item.get("userId"),
    totalPoints: parseFloat((item.get("totalPoints") as number).toFixed(2)),
  })) as AggregateResult[];
}

export async function getLast(numberOfSessions: number) {
  const lastSessions = await ArchivedStudySession.findAll({
    order: [["createdAt", "DESC"]],
    limit: numberOfSessions,
  });

  return lastSessions;
}

type PointsBySubject = {
  [userId: string]: {
    [subject: string]: number;
  };
};

export async function getPointsSumsPerUserWithSubject() {
  const results = await ArchivedStudySession.findAll({
    attributes: [
      "userId",
      "subjectName",
      [DbConnection.fn("SUM", DbConnection.col("points")), "totalPoints"],
    ],
    group: ["userId", "subjectName"],
    order: [
      ["userId", "ASC"],
      ["subjectName", "ASC"],
    ],
  });

  const usersWithPointsBySubject: PointsBySubject = {};

  results.forEach((item) => {
    const { userId, subject, totalPoints } = {
      userId: item.get("userId") as string,
      subject: item.get("subjectName") as string,
      totalPoints: parseFloat((item.get("totalPoints") as number).toFixed(2)),
    };

    if (!usersWithPointsBySubject[userId]) {
      usersWithPointsBySubject[userId] = {};
    }

    usersWithPointsBySubject[userId][subject] = totalPoints;
  });

  return usersWithPointsBySubject;
}

type UserPointsBySubject = { subjectName: string; totalPoints: number }[];

export async function getPointsSumsWithSubjectFromUser(userId: string) {
  const results = await ArchivedStudySession.findAll({
    attributes: [
      "subjectName",
      [DbConnection.fn("SUM", DbConnection.col("points")), "totalPoints"],
    ],
    group: ["subjectName"],
    order: [["subjectName", "ASC"]],
    where: {
      userId,
    },
  });

  const pointsBySubject: UserPointsBySubject = results.map((item) => ({
    subjectName: item.get("subjectName") as string,
    totalPoints: parseFloat((item.get("totalPoints") as number).toFixed(2)),
  }));

  return pointsBySubject;
}

export async function getStudySessionsFromUser(userId: string) {
  const lastSessions = await ArchivedStudySession.findAll({
    order: [["createdAt", "DESC"]],
  });

  return lastSessions.map((session) => ({
    subjectName: session.dataValues.subjectName,
    totalPoints: session.dataValues.points,
  }));
}
