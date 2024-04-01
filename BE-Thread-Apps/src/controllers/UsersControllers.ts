import { Request, Response } from 'express';
import UsersServices from '../services/UsersServices';

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
        bio: req.body.bio,
      };
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
