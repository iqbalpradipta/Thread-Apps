import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import { redisClient } from '../libs/redis';

export default new (class UserServices {
  private readonly UsersRepository: Repository<Users> = AppDataSource.getRepository(Users);

  async Suggest(token): Promise<object> {
    try {
      await redisClient.del('suggest')
      let data = await redisClient.get('suggest');
      if (!data) {
        const getUser = await this.UsersRepository.createQueryBuilder('users').leftJoinAndSelect('users.following', 'following').leftJoinAndSelect('users.threads', 'threads').where('users.id != :token', { token }).getMany();
        const stringData = JSON.stringify(getUser);
        data = stringData;
        await redisClient.set('suggest', stringData);
      }
      const parseData = JSON.parse(data);
      return {
        messages: 'Get users Success',
        data: parseData,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<object> {
    try {
      let data = await redisClient.get('usersAll');
      if (!data) {
        const getUser = await this.UsersRepository.createQueryBuilder('users').leftJoinAndSelect('users.following', 'following').leftJoinAndSelect('users.threads', 'threads').loadRelationCountAndMap('users.followingNumber', 'users.following').loadRelationCountAndMap('users.followerNumber', 'users.follower').getMany();
        const stringData = JSON.stringify(getUser);
        data = stringData;
        await redisClient.set('usersAll', data);
      }
      const parseData = JSON.parse(data);
      return {
        messages: 'Get users Success',
        data: parseData,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUsersById(id: number): Promise<object> {
    try {
      await redisClient.del('usersID')
      let data = await redisClient.get('usersID')
      const getUser = await this.UsersRepository.createQueryBuilder('users').leftJoinAndSelect('users.following', 'following').leftJoinAndSelect('users.replies', 'replies').loadRelationCountAndMap('users.followingNumber', 'users.following').loadRelationCountAndMap('users.followerNumber', 'users.follower').where({ id }).getOneOrFail();
      const stringData = JSON.stringify(getUser)
      data = stringData
      await redisClient.set('usersID', data)
      const parseData = JSON.parse(data)

      return {
        messages: `Get users Success with id = ${id}`,
        data: parseData,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUsers(data: object, id: any): Promise<object> {
    try {
      const updateUsers = await this.UsersRepository.createQueryBuilder().update(Users).set(data).where(id).execute();
      return {
        messages: 'update users Success',
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteUsers(id: any): Promise<object> {
    try {
      const deleteUsers = await this.UsersRepository.createQueryBuilder().delete().from(Users).where(id).execute();
      return {
        messages: 'delete users success',
        data: deleteUsers,
      };
    } catch (error) {
      throw error;
    }
  }
})();
