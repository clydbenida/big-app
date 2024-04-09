import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { CreateUserType } from "../../models/User";
import AuthRepository from "./repository";
import { loginBodyType } from "./types";

dotenv.config();

class AuthServiceClass {
  private async hashPassword(password: string) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS!);

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  signAccessToken (userData: object) {
    return jwt.sign(userData, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  signRefreshToken (userData: object) {
    return jwt.sign(userData, process.env.JWT_SECRET!, { expiresIn: '1d' });
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
    try {
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

      const userObject = {
        user_id: userDetails.user_id,
        email: userDetails.email,
      }
      const accessToken = this.signAccessToken(userObject);
      const refreshToken = this.signRefreshToken(userObject);

      return { userDetails, accessToken, refreshToken };

    }
    catch (err) {
      console.log(err)
      throw new Error('Error login');
    }
  }
}

const AuthService = new AuthServiceClass();

export default AuthService;
