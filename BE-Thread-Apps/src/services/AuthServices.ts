import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, response } from 'express';

export default new (class AuthServices {
  private readonly AuthRepository: Repository<Users> = AppDataSource.getRepository(Users);

  async Register(data: object | any): Promise<object> {
    try {
      const searchUser = await this.AuthRepository.createQueryBuilder().where({ email: data.email, username: data.username }).getCount();

      if (searchUser > 0) {
        return {
          messages: 'users or email already registers',
        };
      }
      const registerUser = await this.AuthRepository.createQueryBuilder().insert().into(Users).values(data).execute();

      return {
        messages: 'Success create Users',
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async Login(data: object | any): Promise<object | string> {
    try {
      const checkEmail = await this.AuthRepository.createQueryBuilder('users').where({ email: data.email }).getOne();
      if (!checkEmail) {
        return {
          messages: `Email ${data.email} is wrong!`,
        };
      }
      const passwordCompare = await bcrypt.compare(data.password, checkEmail.password);
      if (!passwordCompare) {
        return {
          messages: `Password is wrong!`,
        };
      }

      const Payload = {
        id: checkEmail.id,
        fullName: checkEmail.fullName,
        username: checkEmail.username,
        email: checkEmail.email,
      };

      const token = jwt.sign({ Payload }, process.env.SECRET_KEY, { expiresIn: '24h' });

      return {
        messages: 'Login success',
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async Check(req: Request, res: Response): Promise<Response | void> {
    try {
      const token = res.locals.loginSession;

      const response = await this.AuthRepository.createQueryBuilder('users').where({ token }).getOneOrFail();

      // Check user with getOne to search ID
      // sama aja kayak find id tapi find nya di token

      return res.status(200).json({ messages: 'token valdi', response });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
})();
