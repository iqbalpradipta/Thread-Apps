import { Request, Response } from 'express';
import FollowingServices from '../services/FollowingServices';

export default new (class FollowingController {
  async followings(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const data = req.body
      data.usersFollowing = id
      data.usersFollower = res.locals.loginSession.Payload.id;
      if(data.isFollow === false || null || undefined) {
        data.isFollow = true
      } else {
        data.isFollow = false
      }

      const response = await FollowingServices.followings(data, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const id = res.locals.loginSession.Payload.id
      const response = await FollowingServices.getFollowing(id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async getFollower(req: Request, res: Response) {
    try {
      const id = res.locals.loginSession.Payload.id
      const response = await FollowingServices.getFollower(id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async checkFollowing(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const data = req.body
      data.usersFollowing = id
      data.usersFollower = res.locals.loginSession.Payload.id;
      data.isFollow = true
      if(data.isFollow === false || null || undefined) {
        data.isFollow = true
      }

      const response = await FollowingServices.followings(data, id);
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await FollowingServices.unfollow(id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
