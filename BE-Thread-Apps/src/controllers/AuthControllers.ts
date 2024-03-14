import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import AuthServices from '../services/AuthServices';
import { AuthUsersScheme } from '../utils/validator/AuthValidator';

export default new (class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const hashPassword = await bcrypt.hash(data.password, 10);
      data.password = hashPassword;
      data.photo_profile = 'https://bit.ly/broken-link';
      data.fullName = data.username + Math.floor(Math.random() * 100 + 1);
      // const { error, value } = AuthUsersScheme.validate(data);
      // if (error) return error;

      const response = await AuthServices.Register(data);
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const response = await AuthServices.Login(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async check(req: Request, res: Response) {
    AuthServices.Check(req, res);
  }
})();
