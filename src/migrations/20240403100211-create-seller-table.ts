import { QueryInterface, DataTypes } from "sequelize";
import sequelize from "../config/db";

/** @type {import('sequelize-cli').Migration} */
async function migrateUp(queryInterface: QueryInterface) {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.createTable("sellers", {
      seller_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: 'user_id',
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
    console.log("Transacting...");
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
  }
}

async function migrateDown(queryInterface: QueryInterface) {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.dropTable("sellers");
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
  }
}

const direction = process.argv[2];

if (!(direction === "up" || direction === "down")) {
  throw Error("Please specify the direction - up or down");
}

if (direction.toLocaleLowerCase() === "up") {
  migrateUp(sequelize.getQueryInterface());
} else if (direction.toLocaleLowerCase() === "down") {
  migrateDown(sequelize.getQueryInterface());
}
