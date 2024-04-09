import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { CreateUserType } from "../../models/User";
import AuthRepository from "./repository";
import { loginBodyType } from "./types";
import { sendTemplate } from "../../helpers/utils";

class AuthServiceClass {
  private async hashPassword(password: string) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS!);

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async registerUser(newUser: CreateUserType) {
    const hashedPassword = await this.hashPassword(newUser.password);
    const hashedUser: CreateUserType = {
      ...newUser,
      password: hashedPassword,
    };
    const resp = await AuthRepository.createUser(hashedUser);

    return resp;
  }

  async loginUser(userBody: loginBodyType) {
    const userDetails = await AuthRepository.getUserByEmail(userBody.email);

    if (!userDetails?.password) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = bcrypt.compareSync(
      userBody.password,
      userDetails?.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    const accessToken = jwt.sign({ userDetails }, process.env.APP_SECRET!, { expiresIn: '1h'});
    const refreshToken = jwt.sign({ userDetails }, process.env.APP_SECRET!, { expiresIn: '1d'});

    
    return {accessToken, refreshToken, userDetails};
  }
}

const AuthService = new AuthServiceClass();

export default AuthService;
