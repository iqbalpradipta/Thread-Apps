import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UsersServices from '../services/UsersServices';
import cloudinaryConfig from '../libs/cloudinary';
import { promisify } from 'util';
import * as fs from 'fs';

const deleteFile = promisify(fs.unlink);

export default new (class UsersController {
  async Suggest(req: Request, res: Response) {
    try {
      const token = res.locals.loginSession.Payload.id;
      const response = await UsersServices.Suggest(token);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const response = await UsersServices.getUsers();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await UsersServices.getUsersById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = {
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
        photo_profile: res.locals.filename,
      };
      if (req.file) {
        const cloudinary = await cloudinaryConfig.destination(data.photo_profile);
        data.photo_profile = cloudinary;
        await deleteFile(`src/uploadFiles/${res.locals.filename}`);
      }

      if(data.password) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
      }

      const response = await UsersServices.updateUsers(data, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateBg(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = {
        background_profile: res.locals.filename,
      };
      let img = null;
      if (req.file) {
        const cloudinary = await cloudinaryConfig.destination(data.background_profile);
        data.background_profile = cloudinary;
        await deleteFile(`src/uploadFiles/${res.locals.filename}`);
      } else {
        data.background_profile = img;
      }

      const response = await UsersServices.updateUsers(data, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UsersServices.deleteUsers(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
