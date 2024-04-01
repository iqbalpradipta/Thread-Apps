import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Replies } from '../entities/Replies';
import { redisClient } from '../libs/redis';
import { json } from 'stream/consumers';

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  async InsertReplies(data: object): Promise<object> {
    try {
      await this.RepliesRepository.createQueryBuilder().insert().into(Replies).values(data).execute();
      await redisClient.del('threads')
      await redisClient.del('replies')
      return {
        messages: 'Success Insert Replies',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getReplies(): Promise<object> {
    try {
      let data = await redisClient.get('replies')
      if(!data) {
        const dataReplies = await this.RepliesRepository
        .createQueryBuilder('replies')
        .leftJoinAndSelect('replies.users', 'users')
        .leftJoinAndSelect('replies.threads', 'threads')
        .getMany();

        const stringData = JSON.stringify(dataReplies)
        data = stringData
        await redisClient.set('replies', stringData)
      }
      const parseData = JSON.parse(data)

      return {
        messages: 'Success get Replies',
        data: parseData,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRepliesById(id: number): Promise<object> {
    try {
      let data = await redisClient.get('repliesID')
      if(data) {
        await redisClient.del('repliesID')
        const dataReplies = await this.RepliesRepository
        .createQueryBuilder('replies')
        .leftJoinAndSelect('replies.users', 'users')
        .leftJoinAndSelect('replies.threads', 'threads')
        .where('replies.threads = :id', { id })
        .getOneOrFail();
        const stringData = JSON.stringify(dataReplies)
        data = stringData
        await redisClient.set('repliesID', stringData)
      } else {
        const dataReplies = await this.RepliesRepository
        .createQueryBuilder('replies')
        .leftJoinAndSelect('replies.users', 'users')
        .leftJoinAndSelect('replies.threads', 'threads')
        .where('replies.threads = :id', { id })
        .getOneOrFail();
        const stringData = JSON.stringify(dataReplies)
        data = stringData
        await redisClient.set('repliesID', stringData)
      }
      const parseData = JSON.parse(data)
      return {
        messages: 'Success get Replies',
        data: parseData,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getReplyByThreads(id: number): Promise<object> {
    try {
      const getUser = await this.RepliesRepository
      .createQueryBuilder('replies')
      .leftJoinAndSelect('replies.threads', 'threads')
      .leftJoinAndSelect('replies.users', 'users')
      .where('replies.threads = :id ', { id })
      .getMany();
      return {
        messages: `Get users Success with reply = ${id}`,
        data: getUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateReplies(data: object, id: number): Promise<object> {
    try {
      const updateData = await this.RepliesRepository.createQueryBuilder().update(Replies).set(data).where({ id }).execute();

      return {
        messages: 'Update replies success',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteReplies(id: number): Promise<object> {
    try {
      const deleteData = await this.RepliesRepository.createQueryBuilder().delete().from(Replies).where({ id }).execute();
      return {
        messages: 'Delete Replies success',
      };
    } catch (error) {
      throw error;
    }
  }
})();
