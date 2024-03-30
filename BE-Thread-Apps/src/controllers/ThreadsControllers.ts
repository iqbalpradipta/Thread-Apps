import { Request, Response } from 'express';
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
  // async insertThreads(req: Request, res: Response) {
  //   try {
  //     const data = req.body;
  //     data.users = res.locals.loginSession.Payload;
  //     let img = null;
  //     if (req.file) {
  //       data.image = res.locals.filename;
  //       const cloudinary = await cloudinaryConfig.destination(data.image);
  //       data.image = cloudinary
  //       await deleteFile(`src/uploadFiles/${res.locals.filename}`)
  //     } else {
  //       data.image = img;
  //     }

  //     const { error, value } = createThreadsScheme.validate(data);
  //     if (!value) {
  //       return res.status(400).json(error);
  //     }

  //     const response = await ThreadService.insertThreads(value)
  //     // const response = await ThreadQueue.create(value, res);
  //     res.status(201).json(response);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(error);
  //   }
  // }

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
