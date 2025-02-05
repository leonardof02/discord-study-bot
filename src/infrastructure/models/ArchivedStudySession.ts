import { DataTypes, Model, Optional } from "sequelize";
import DbConnection from "../DbConnection";
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
      type: DataTypes.FLOAT,
    },
    humanReadableTotalTime: {
      type: DataTypes.STRING,
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
