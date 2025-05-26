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
      data.photo_profile = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png';
      data.background_profile = 'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=740&t=st=1707180635~exp=1707181235~hmac=10e35b2b792774036e09eb9afaeb121f7fb864f6b06e8818706a7be281b45bfd'
      data.bio = `Halo semua nama saya ${data.username}`
      data.fullName = data.username + Math.floor(Math.random() * 100 + 1);

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
