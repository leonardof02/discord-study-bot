import DbConnection from "../DbConnection";
import {
  StudySessionData,
  ArchivedStudySession,
} from "../models/ArchivedStudySession";

export async function archiveStudySession(studySession: StudySessionData) {
  (await ArchivedStudySession.create(studySession)).save();
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
    totalPoints: item.get("totalPoints"),
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
      totalPoints: item.get("totalPoints") as number,
    };

    if (!usersWithPointsBySubject[userId]) {
      usersWithPointsBySubject[userId] = {};
    }

    usersWithPointsBySubject[userId][subject] = totalPoints;
  });

  return usersWithPointsBySubject;
}
