import { Request, Response } from 'express';
import RepliesService from '../services/RepliesService';

export default new (class RepliesControllers {
  async insertReplies(req: Request, res: Response) {
    try {
      const data = req.body;
      data.users = res.locals.loginSession.Payload

      const response = await RepliesService.InsertReplies(data);
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getReplies(req: Request, res: Response) {
    try {
      const response = await RepliesService.getReplies();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getRepliesById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await RepliesService.getRepliesById(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getReplyByThreads(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await RepliesService.getReplyByThreads(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateReplies(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const decode = res.locals.decodeData
      const idUser = decode.Payload.id

      const data = req.body;
      data.users = idUser;

      const response = await RepliesService.updateReplies(data, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteReplies(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await RepliesService.deleteReplies(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
