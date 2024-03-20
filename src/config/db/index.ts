import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
  },
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function gracefulShutdown() {
  console.log("Closing database connection...");
  await sequelize.close();
  console.log("Database connection closed");
  process.exit(0); // Exit the process gracefully
}

export default sequelize;
