import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Replies } from '../entities/Replies';

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  async InsertReplies(data: object): Promise<object> {
    try {
      await this.RepliesRepository.createQueryBuilder().insert().into(Replies).values(data).execute();

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
      const dataReplies = await this.RepliesRepository.createQueryBuilder('replies').leftJoinAndSelect('replies.users', 'users').leftJoinAndSelect('replies.threads', 'threads').getMany();

      return {
        messages: 'Success get Replies',
        data: dataReplies,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRepliesById(id: number): Promise<object> {
    try {
      const dataReplies = await this.RepliesRepository
      .createQueryBuilder('replies')
      .leftJoinAndSelect('replies.users', 'users')
      .leftJoinAndSelect('replies.threads', 'threads')
      .where('replies.threads = :id', { id })
      .getOne();

      return {
        messages: 'Success get Replies',
        data: dataReplies,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getReplyByThreads(id: number): Promise<object> {
    try {
      const getUser = await this.RepliesRepository.createQueryBuilder('replies').leftJoinAndSelect('replies.threads', 'threads').leftJoinAndSelect('replies.users', 'users').where('replies.threads = :id ', { id }).getMany();
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
