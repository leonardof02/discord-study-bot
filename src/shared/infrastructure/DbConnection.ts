import { env } from "./config/DotenvVars";
import { Sequelize } from "sequelize";

const DbConnection = new Sequelize({
  dialect: "postgres",
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

export async function syncDatabase() {
  try {
    DbConnection.authenticate();
    await DbConnection.sync({ alter: true, force: true });
    console.log("Database synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

export default DbConnection;
