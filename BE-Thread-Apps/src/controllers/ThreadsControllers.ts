import { Request, Response } from 'express';
import ThreadService from '../services/ThreadService';
import { createThreadsScheme } from '../utils/validator/ThreadsValidator';
import cloudinaryConfig from "../libs/cloudinary";
import { promisify } from "util";
import * as fs from "fs";

const deleteFile = promisify(fs.unlink);


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
    try {
      const data = req.body;
      data.users = res.locals.loginSession.Payload;
      let img = null;
      if (req.file) {
        data.image = res.locals.filename;
        const cloudinary = await cloudinaryConfig.destination(data.image);
        data.image = cloudinary;
        await deleteFile(`src/uploadFiles/${res.locals.filename}`);
      } else {
        data.image = img;
      }

      const response = await ThreadService.insertThreads(data);

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async updateThreads(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      data.users = res.locals.loginSession.Payload;

      const response = await ThreadService.updateThreads(data, id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
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
