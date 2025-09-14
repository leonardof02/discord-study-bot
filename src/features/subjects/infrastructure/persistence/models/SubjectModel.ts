import { DataTypes, Model } from "sequelize";
import DbConnection from "../../../../../shared/infrastructure/DbConnection";
import { Subject } from "../../../domain/Subject";

export const SubjectModel = DbConnection.define<Model<Subject>>("Subject", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
