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
}

const AuthRepository = new AuthRepositoryClass();

export default AuthRepository;
