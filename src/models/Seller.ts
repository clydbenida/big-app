import { CreationAttributes, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

import User from "./User";

class Seller extends Model<InferAttributes<Seller>, InferCreationAttributes<Seller>> {
  declare seller_id: CreationOptional<number>;
  declare user_id: CreationOptional<number>;
  declare shop_name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Seller.init({
  seller_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    }
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  shop_name: {
    type: DataTypes.STRING,
  }
}, {
  modelName: 'sellers',
  sequelize,
});

Seller.belongsTo(User, {
  foreignKey: 'user_id',
});

export interface CreateSellerType extends CreationAttributes<Seller> {}

export default Seller;