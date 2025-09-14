import Model from "sequelize/types/model";
import { StudySession } from "../../domain/entities/StudySession";
import { FinishedStudySession } from "../persistence/models/FinishedStudySession";

export class FinishedStudySessionAdapter {
  static toDomain(defaultType: Model<FinishedStudySession>): StudySession {
    return new StudySession({
      id: defaultType.dataValues.id,
      totalTime: defaultType.dataValues.totalTime,
      subjectId: defaultType.dataValues.subjectId,
      points: defaultType.dataValues.points,
      startTime: defaultType.dataValues.startTime,
      userId: defaultType.dataValues.userId,
      challenge: defaultType.dataValues.challenge,
    });
  }
}
