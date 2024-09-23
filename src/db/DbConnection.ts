import { Sequelize } from "sequelize";

const DbConnection = new Sequelize({
  dialect: "sqlite",
  storage: "database.db",
});

export async function syncDatabase() {
  try {
    await DbConnection.sync({
      alter: true
    });
    console.log("Database synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

export default DbConnection;
