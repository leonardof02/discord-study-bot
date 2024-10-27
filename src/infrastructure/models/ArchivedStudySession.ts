import { DataTypes, Model, Optional } from "sequelize";
import DbConnection from "../DbConnection";
import { StudySessionData } from "../../domain/StudySessionData";



export const ArchivedStudySession = DbConnection.define<
  Model<StudySessionData, Optional<StudySessionData, "id">>
>(
  "StudySession",
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.NUMBER,
    },
    totalTime: {
      type: DataTypes.NUMBER,
    },
    points: {
      type: DataTypes.NUMBER,
    },
    humanReadableTotalTime: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "studySessions",
    paranoid: false,
  }
);
export { StudySessionData };

