import { Request, Response } from 'express';
import LikeService from '../services/LikeService';

export default new (class LikesController {
  async insertLikes(req: Request, res: Response) {
    try {
      const data = req.body;
      data.users = res.locals.loginSession.Payload.id

      const response = await LikeService.insertLike(data);
      res.status(201).json(response);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  async getLikes(req: Request, res: Response) {
    try {
      const response = await LikeService.getLike();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
