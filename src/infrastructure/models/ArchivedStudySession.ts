import DbConnection from "../DbConnection";
import { DataTypes, Model, Optional } from "sequelize";
import { StudySessionData } from "../../domain/StudySessionData";

export const ArchivedStudySession = DbConnection.define<
  Model<StudySessionData, Optional<StudySessionData, "id">>
>(
  "StudySession",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    subjectName: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.BIGINT,
    },
    totalTime: {
      type: DataTypes.BIGINT,
    },
    points: {
      type: DataTypes.DECIMAL(10, 2),
    },
    humanReadableTotalTime: {
      type: DataTypes.BIGINT,
    },
    challengeCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "studySessions",
    paranoid: false,
  }
);
export { StudySessionData };
