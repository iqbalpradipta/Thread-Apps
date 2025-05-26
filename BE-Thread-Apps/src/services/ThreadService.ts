import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Threads } from "../entities/Threads";

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async getThreads(): Promise<object> {
    try {
      const getThreadsAll = await this.ThreadRepository.createQueryBuilder(
        "threads"
      )
        .orderBy("threads.created_at", "DESC")
        .leftJoinAndSelect("threads.users", "users")
        .leftJoinAndSelect("threads.replies", "replies")
        .select([
          "threads.id",
          "threads.content",
          "threads.image",
          "threads.created_at",
          "threads.updated_at",
          "users.username",
          "users.email",
          "users.fullName",
          "users.photo_profile",
          "replies.id",
          "replies.content",
          "replies.image",
        ])
        .loadRelationCountAndMap("threads.number_of_replies", "threads.replies")
        .loadRelationCountAndMap("threads.number_of_likes", "threads.likes")
        .getMany();
      return {
        messages: "Success get Threads",
        data: getThreadsAll,
      };
    } catch (error) {
      throw error;
    }
  }

  async getThreadsById(id: number): Promise<object> {
    try {
      const getThreads = await this.ThreadRepository.createQueryBuilder(
        "threads"
      )
        .leftJoinAndSelect("threads.users", "users")
        .leftJoinAndSelect("threads.replies", "replies")
        .select([
          "threads.id",
          "threads.content",
          "threads.image",
          "threads.created_at",
          "threads.updated_at",
          "users.username",
          "users.email",
          "users.fullName",
          "users.photo_profile",
          "replies.id",
          "replies.content",
          "replies.image",
        ])
        .loadRelationCountAndMap("threads.number_of_replies", "threads.replies")
        .loadRelationCountAndMap("threads.number_of_likes", "threads.likes")
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

  async insertThreads(data: object): Promise<object> {
    try {
      await this.ThreadRepository.createQueryBuilder()
        .insert()
        .into(Threads)
        .values(data)
        .execute();

      return {
        messages: "success create Threads",
        data,
      };
    } catch (error) {
      throw error
    }
  }

  async updateThreads(data: object, id: number): Promise<object> {
    try {
      const updateThreads = await this.ThreadRepository.createQueryBuilder()
        .update(Threads)
        .set(data)
        .where("threads.id = :id", { id })
        .execute();

        if (updateThreads.affected === 0) {
          throw new Error("User not found");
        }
      return {
        messages: "success update Threads",
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getThreadsLogin(id): Promise<object> {
    try {
      const getThreadsLogin = await this.ThreadRepository.createQueryBuilder(
        "threads"
      )
        .orderBy("threads.created_at", "DESC")
        .leftJoinAndSelect("threads.users", "users")
        .leftJoinAndSelect("threads.replies", "replies")
        .select([
          "threads.id",
          "threads.content",
          "threads.image",
          "threads.created_at",
          "threads.updated_at",
          "users.username",
          "users.email",
          "users.fullName",
          "users.photo_profile",
          "replies.id",
          "replies.content",
          "replies.image",
        ])
        .loadRelationCountAndMap("threads.number_of_replies", "threads.replies")
        .loadRelationCountAndMap("threads.number_of_likes", "threads.likes")
        .where("threads.users = :id", { id })
        .getMany();
      return {
        messages: "Succes getThreads By Login",
        data: getThreadsLogin,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteThreads(id: number): Promise<object> {
    try {
      const deleteThreads = await this.ThreadRepository.createQueryBuilder()
        .delete()
        .from(Threads)
        .where({ id })
        .execute();

      return {
        messages: "success delete Threads",
      };
    } catch (error) {
      throw error;
    }
  }
})();
