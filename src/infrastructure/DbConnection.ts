import { Sequelize } from "sequelize";

const DbConnection = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export async function syncDatabase() {
  try {
    await DbConnection.sync({
      alter: true,
    });
    console.log("Database synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

export default DbConnection;
