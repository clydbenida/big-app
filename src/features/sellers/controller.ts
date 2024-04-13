import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { extractAccessToken, sendTemplate } from "../../helpers/utils";

class SellerControllerClass {
  async createSeller(req: Request, res: Response) {
    try {
      const accessToken = extractAccessToken(req);
      const userObj = jwt.decode(accessToken) 
      const { shop_name } = req.body;
      console.log('userObj', userObj);
      console.log('shop_name', shop_name);
      res.send('Creating Seller')
    } catch (err) {
      console.log(err)
      sendTemplate(res, {
        code: 500,
        message: "Error creating seller",
      })
    }
  }
}

const SellerController = new SellerControllerClass();

export default SellerController;
