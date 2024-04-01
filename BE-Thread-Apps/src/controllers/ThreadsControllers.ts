import { Request, Response, response } from 'express';
import ThreadService from '../services/ThreadService';
import { createThreadsScheme } from '../utils/validator/ThreadsValidator';
import cloudinaryConfig from '../libs/cloudinary';
import ThreadQueue from '../queue/ThreadQueue';

export default new (class ThreadsController {
  async getThreads(req: Request, res: Response) {
    try {
      const response = await ThreadService.getThreads();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getThreadsById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadService.getThreadsById(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getThreadsLogin(req: Request, res: Response) {
    try {
      const id = req.params.id
      const response = await ThreadService.getThreadsLogin(id)

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }



  async insertThreads(req: Request, res: Response) {
    ThreadService.insertThreads(req, res);
  }

  async updateThreads(req: Request, res: Response) {
    try {
      const decode = res.locals.decodeData;
      const idUser = decode.Payload.id;
      const id = parseInt(req.params.id);
      const data = req.body;
      data.users = idUser;

      const response = await ThreadService.updateThreads(data, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteThreads(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ThreadService.deleteThreads(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
