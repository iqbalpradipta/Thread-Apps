import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { Repository } from "typeorm";
import { redisClient } from "../libs/redis";

export default new (class UserServices {
  private readonly UsersRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async Suggest(token): Promise<object> {
    try {
      const getUser = await this.UsersRepository.createQueryBuilder("users")
        .leftJoinAndSelect("users.following", "following")
        .leftJoinAndSelect("users.threads", "threads")
        .where("users.id != :token", { token })
        .getMany();
      return {
        messages: "Get users Success",
        data: getUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<object> {
    try {
      const getUser = await this.UsersRepository.createQueryBuilder("users")
        .leftJoinAndSelect("users.following", "following")
        .leftJoinAndSelect("users.threads", "threads")
        .loadRelationCountAndMap("users.followingNumber", "users.following")
        .loadRelationCountAndMap("users.followerNumber", "users.follower")
        .getMany();
      return {
        messages: "Get users Success",
        data: getUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUsersById(id: number): Promise<object> {
    try {
      const getUser = await this.UsersRepository.createQueryBuilder("users")
        .leftJoinAndSelect("users.following", "following")
        .leftJoinAndSelect("users.replies", "replies")
        .loadRelationCountAndMap("users.followingNumber", "users.following")
        .loadRelationCountAndMap("users.followerNumber", "users.follower")
        .where({ id })
        .getOneOrFail();

      return {
        messages: `Get users Success with id = ${id}`,
        data: getUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUsers(data: object, id: any): Promise<object> {
    try {
      const updateUsers = await this.UsersRepository.createQueryBuilder()
        .update(Users)
        .set(data)
        .where("users.id = :id", { id })
        .execute();

      if (updateUsers.affected === 0) {
        throw new Error("User not found");
      }

      return {
        messages: "update users Success",
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateBg(data: object, id: any): Promise<object> {
    try {
      const updateUsers = await this.UsersRepository.createQueryBuilder()
        .update(Users)
        .set(data)
        .where("users.id = :id", { id })
        .execute();

      if (updateUsers.affected === 0) {
        throw new Error("User not found");
      }

      return {
        messages: "update users Success",
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteUsers(id: any): Promise<object> {
    try {
      const deleteUsers = await this.UsersRepository.createQueryBuilder()
        .delete()
        .from(Users)
        .where(id)
        .execute();
      return {
        messages: "delete users success",
        data: deleteUsers,
      };
    } catch (error) {
      throw error;
    }
  }
})();
