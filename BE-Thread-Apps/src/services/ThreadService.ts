import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Threads } from '../entities/Threads';
import { Users } from '../entities/Users';
import { Replies } from '../entities/Replies';
import { createThreadsScheme } from '../utils/validator/ThreadsValidator';
import * as express from 'express'
import cloudinaryConfig from '../libs/cloudinary';
import { promisify } from 'util';
import * as fs from 'fs';

const deleteFile = promisify(fs.unlink);

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);

  async getThreads(): Promise<object> {
    try {
      const getThreadsAll = await this.ThreadRepository.createQueryBuilder('threads')
        .orderBy('threads.created_at', 'DESC')
        .leftJoinAndSelect('threads.users', 'users')
        .leftJoinAndSelect('threads.replies', 'replies')
        .select(
          ['threads.id', 
          'threads.content', 
          'threads.image', 
          'threads.created_at', 
          'threads.updated_at', 
          'users.username', 
          'users.email', 
          'users.fullName', 
          'users.photo_profile',
          'replies.id',
          'replies.content',
          'replies.image'
        ])
        .loadRelationCountAndMap('threads.number_of_replies', 'threads.replies')
        .loadRelationCountAndMap('threads.number_of_likes', 'threads.likes')
        .getMany();

      return {
        messages: 'success get Threads',
        data: getThreadsAll,
      };
    } catch (error) {
      throw error;
    }
  }
  async getThreadsById(id: number): Promise<object> {
    try {
      const getThreads = await this.ThreadRepository.createQueryBuilder('threads')
        .leftJoinAndSelect('threads.users', 'users')
        .leftJoinAndSelect('threads.replies', 'replies')
        .select(
          ['threads.id', 
          'threads.content', 
          'threads.image', 
          'threads.created_at', 
          'threads.updated_at', 
          'users.username', 
          'users.email', 
          'users.fullName', 
          'users.photo_profile',
          'replies.id',
          'replies.content',
          'replies.image',
        ])

        .where({ id })
        .getOneOrFail();

      return {
        messages: `success get threads with id`,
        data: getThreads,
      };
    } catch (error) {
      throw error;
    }
  }

  async insertThreads(req: express.Request, res: express.Response): Promise<object> {
    try {
      const data = req.body;
      data.users = res.locals.loginSession.Payload;
      let img = null;
      if (req.file) {
        data.image = res.locals.filename;
        const cloudinary = await cloudinaryConfig.destination(data.image);
        data.image = cloudinary
        await deleteFile(`src/uploadFiles/${res.locals.filename}`)
      } else {
        data.image = img;
      }

      const { error, value } = createThreadsScheme.validate(data);
      if (!value) {
        return res.status(400).json(error);
      }

      const insertThreads = await this.ThreadRepository.createQueryBuilder().insert().into(Threads).values(data).execute();
      res.status(200).json({
        messages: 'success create Threads',
        data,
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error })
    }
  }

  async updateThreads(data: object, id: number): Promise<object> {
    try {
      const updateThreads = await this.ThreadRepository.createQueryBuilder().update(Threads).set(data).where({ id }).execute();
      return {
        messages: 'success update Threads',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteThreads(id: number): Promise<object> {
    try {   
      const deleteThreads = await this.ThreadRepository
      .createQueryBuilder().delete().from(Threads).where({ id }).execute();

      return {
        messages: 'success delete Threads',
      };


    } catch (error) {
      throw error;
    }
  }
})();