import { Request, Response } from "express";
import { CreateUserType } from "../../models/User";
import AuthService from "./service";
import { sendTemplate } from "../../helpers/utils";
import { loginBodyType } from "./types";

class AuthControllerClass {
  async registerUser(req: Request, res: Response) {
    try {
      const newUser: CreateUserType = {
        email: req.body.email,
        password: req.body.password,
      };

      const resp = await AuthService.registerUser(newUser);

      sendTemplate(res, {
        code: 200,
        data: resp,
        message: "Successfully created user!",
      });
    } catch (err) {
      sendTemplate(res, {
        code: 500,
        data: err,
        message: "Failed to create user.",
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const loginBody: loginBodyType = {
        email: req.body.email,
        password: req.body.password,
      };

      const resp = await AuthService.loginUser(loginBody);

      sendTemplate(res, {
        code: 200,
        data: resp,
        message: "Successfully logged in!",
      });
    } catch (err) {
      sendTemplate(res, {
        code: 500,
        data: err,
        message: "Failed to login user.",
      });
    }
  }
}

const AuthController = new AuthControllerClass();

export default AuthController;
