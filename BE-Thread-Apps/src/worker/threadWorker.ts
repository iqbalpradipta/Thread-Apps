import * as amqp from 'amqplib';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Threads } from '../entities/Threads';
import cloudinary from '../libs/cloudinary';
import { redisClient } from '../libs/redis';

export default new (class ThreadWorker {
  private readonly threadWorker: Repository<Threads> = AppDataSource.getRepository(Threads);

  async create(q: string, conn: amqp.Connection) {
    try {
      const channel = await conn.createChannel();
      await channel.assertQueue(q, async (message) => {
        try {
          const data = JSON.parse(message.content.toString());
          console.log(data);

          await this.threadWorker.createQueryBuilder().insert().into(Threads).values(data).execute();
          await redisClient.del('threads');

          channel.ack(message);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {}
  }
})();
