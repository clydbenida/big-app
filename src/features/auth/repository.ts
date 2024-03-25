import { InferAttributes } from "sequelize";
import User, { CreateUserType } from "../../models/User";

class AuthRepositoryClass {
  async createUser(newUser: CreateUserType) {
    return new Promise((resolve, reject) => {
      try {
        resolve(User.create(newUser));
      } catch (error) {
        reject(error);
      }
    });
  }
  async getUserByEmail(
    userEmail: string,
  ): Promise<InferAttributes<User> | null> {
    return new Promise((resolve, reject) => {
      try {
        resolve(User.findOne({ where: { email: userEmail } }));
      } catch (error) {
        reject(error);
      }
    });
  }
}

const AuthRepository = new AuthRepositoryClass();

export default AuthRepository;
