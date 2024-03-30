import { AppDataSource } from './data-source';
import * as express from 'express';
import Route from './router/route';
import * as cors from 'cors';
import 'dotenv/config';
import cloudinary from './libs/cloudinary';
import { redisClient } from './libs/redis';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 8001;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1/', Route);
    cloudinary.config();
    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    app.listen(port, async () => {
      await redisClient.connect();
      console.log(`Service is running at port ${port}`);
    });
  })
  .catch((error) => console.log(error));
