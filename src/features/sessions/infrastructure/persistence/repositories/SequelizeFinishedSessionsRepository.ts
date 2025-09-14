import { IFinishedStudySessionRepository } from "../../../domain/interfaces/IFinishedStudySessionRepository";
import { Sequelize } from "sequelize";
import { FinishedStudySessionAdapter } from "../../adapters/FinishedStudySession.adapter";
import { FinishedStudySession } from "../models/FinishedStudySession";
import { StudySession } from "../../../domain/entities/StudySession";

export class SequelizeFinishedSessionsRepository
  implements IFinishedStudySessionRepository
{
  private readonly _connection: Sequelize; 

  constructor(connection: Sequelize) {
    this._connection = connection;
  }

  async archiveSession(session: StudySession) {
    const newStudySession = await FinishedStudySession.create(session);
    newStudySession.save();
    return newStudySession.dataValues.id;
  }

  async getArchivedSessions(): Promise<StudySession[]> {
    const results = await FinishedStudySession.findAll({
      attributes: [
        "userId",
        [
          this._connection.fn("SUM", this._connection.col("points")),
          "totalPoints",
        ],
      ],
      group: ["userId"],
      order: [
        [this._connection.fn("SUM", this._connection.col("points")), "DESC"],
      ],
    });

    return results.map((item) => FinishedStudySessionAdapter.toDomain(item));
  }
  async getPointsSumsPerUser(): Promise<
    { userId: string; totalPoints: number }[]
  > {
    interface AggregateResult {
      userId: string;
      totalPoints: number;
    }

    const results = await FinishedStudySession.findAll({
      attributes: [
        "userId",
        [
          this._connection.fn("SUM", this._connection.col("points")),
          "totalPoints",
        ],
      ],
      group: ["userId"],
      order: [
        [this._connection.fn("SUM", this._connection.col("points")), "DESC"],
      ],
    });

    return results.map((item) => ({
      userId: item.get("userId"),
      totalPoints: parseFloat((item.get("totalPoints") as number).toFixed(2)),
    })) as AggregateResult[];
  }
  async getLast(numberOfSessions: number): Promise<StudySession[]> {
    const lastSessions = await FinishedStudySession.findAll({
      order: [["createdAt", "DESC"]],
      limit: numberOfSessions,
    });

    return lastSessions.map((item) =>
      FinishedStudySessionAdapter.toDomain(item)
    );
  }
  async getPointsSumsPerUserWithSubject(): Promise<
    Record<string, Record<string, number>>
  > {
    const results = await FinishedStudySession.findAll({
      attributes: [
        "userId",
        "subjectName",
        [
          this._connection.fn("SUM", this._connection.col("points")),
          "totalPoints",
        ],
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
  async getPointsSumsWithSubjectFromUser(
    userId: string
  ): Promise<{ subjectName: string; totalPoints: number }[]> {
    const results = await FinishedStudySession.findAll({
      attributes: [
        "subjectName",
        [
          this._connection.fn("SUM", this._connection.col("points")),
          "totalPoints",
        ],
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
  async getStudySessionsFromUser(
    userId: string
  ): Promise<{ subjectName: string | null; totalPoints: number }[]> {
    const lastSessions = await FinishedStudySession.findAll({
      order: [["createdAt", "DESC"]],
    });

    return lastSessions.map((session) => ({
      subjectName: session.dataValues.subjectId ?? null,
      totalPoints: session.dataValues.points,
    }));
  }
}

type PointsBySubject = {
  [userId: string]: {
    [subject: string]: number;
  };
};

type UserPointsBySubject = { subjectName: string; totalPoints: number }[];
export function getStudySessionsFromUser(userId: string) {
  throw new Error("Function not implemented.");
}
