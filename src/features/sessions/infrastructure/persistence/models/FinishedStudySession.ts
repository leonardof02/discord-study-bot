import { DataTypes, Model } from "sequelize";
import DbConnection from "../../../../../shared/infrastructure/DbConnection";

export type FinishedStudySession = {
  id: string;
  userId: string;
  subjectId?: string;
  totalTime?: number;
  points: number;
  startTime?: number;
  challenge?: Challenge;
};

export const FinishedStudySession = DbConnection.define<
  Model<FinishedStudySession>
>(
  "StudySession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: true
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
  },
  {
    tableName: "studySessions",
    paranoid: false,
  }
);
