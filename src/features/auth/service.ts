import { CreateUserType } from "../../models/User";
import AuthRepository from "./repository";

class AuthServiceClass {
  async registerUser(newUser: CreateUserType) {
    const resp = await AuthRepository.createUser(newUser);

    return resp;
  }
}

const AuthService = new AuthServiceClass();

export default AuthService;
