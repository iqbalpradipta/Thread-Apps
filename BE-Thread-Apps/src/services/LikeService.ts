import { Repository } from 'typeorm';
import { Likes } from '../entities/Likes';
import { AppDataSource } from '../data-source';

export default new (class LikesService {
  private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  async insertLike(data: object | any): Promise<object> {
    try {
      const getLikes = await this.LikesRepository
      .createQueryBuilder('likes')
      .leftJoinAndSelect('likes.threads', 'threads')
      .leftJoinAndSelect('likes.users', 'users')
      .where({ threads: data.threads, users: data.users })
      .getOne();

      if (getLikes) {
        await this.deleteLike(getLikes.id);
        return { messages: 'success unlike threads' };
      }

      const likeThreads = await this.LikesRepository.createQueryBuilder().insert().into(Likes).values(data).execute();

      return {
        messages: 'success like threads',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLike(): Promise<object> {
    try {
      const getLikes = await this.LikesRepository.createQueryBuilder('likes').leftJoinAndSelect('likes.threads', 'threads').leftJoinAndSelect('likes.users', 'users').getMany();
      return {
        messages: 'success get like threads',
        data: getLikes,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLikeById(): Promise<object> {
    try {
      const getLikesById = await this.LikesRepository.createQueryBuilder('likes').leftJoinAndSelect('likes.threads', 'threads').leftJoinAndSelect('likes.users', 'users').getOneOrFail();
      return {
        messages: 'success get like threads',
        data: getLikesById,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(id: number): Promise<object> {
    try {
      const deleteLikes = await this.LikesRepository.createQueryBuilder().delete().from(Likes).where({ id }).execute();
      return {
        messages: 'success delete like threads',
      };
    } catch (error) {
      throw error;
    }
  }
})();
