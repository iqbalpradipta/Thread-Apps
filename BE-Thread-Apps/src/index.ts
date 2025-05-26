import { AppDataSource } from './data-source';
import * as express from 'express';
import Route from './router/route';
import * as cors from 'cors';
import 'dotenv/config';
import cloudinary from './libs/cloudinary';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 8000;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1/', Route);
    cloudinary.config();

    app.listen(port, async () => {
      console.log(`Service is running at port ${port}`);
    });
  })
  .catch((error) => console.log(error));
