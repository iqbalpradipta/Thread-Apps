import { Repository } from 'typeorm';
import { Following } from '../entities/Following';
import { AppDataSource } from '../data-source';

export default new (class FollowingServices {
  private readonly FollowingRepository: Repository<Following> = AppDataSource.getRepository(Following);

  async followings(data: object | any, id: number): Promise<object> {
    try {
      const getFollowing = await this.FollowingRepository.createQueryBuilder('following').leftJoinAndSelect('following.usersFollowing', 'usersFollowing').where({ usersFollowing: id, usersFollower: data.usersFollower }).getOne();

      if (getFollowing) {
        await this.unfollow(getFollowing.id);

        return {
          messages: 'success unfollow this users',
        };
      }

      const following = await this.FollowingRepository.createQueryBuilder().insert().into(Following).values(data).execute();

      return {
        messages: 'success following users',
        data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFollowing(id): Promise<object> {
    try {
      const getFollowing = await this.FollowingRepository.createQueryBuilder('following')
        .leftJoinAndSelect('following.usersFollowing', 'usersFollowing')
        .where('following.usersFollower = :id', { id })
        .getMany();

      return {
        messages: 'succes get data following',
        data: getFollowing,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFollower(id): Promise<object> {
    try {
      const getFollower = await this.FollowingRepository.
      createQueryBuilder('following')
      .leftJoinAndSelect('following.usersFollower', 'usersFollower')
      .where('following.usersFollowing = :id', { id })
      .getMany();

      return {
        messages: 'succes get data following',
        data: getFollower,
      };
    } catch (error) {
      throw error;
    }
  }

  async unfollow(id: number): Promise<object> {
    try {
      const unfollow = await this.FollowingRepository.createQueryBuilder().delete().from(Following).where({ id }).execute();

      return {
        messages: 'success unfollow users',
      };
    } catch (error) {
      throw error;
    }
  }
})();
