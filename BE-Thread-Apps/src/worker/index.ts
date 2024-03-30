import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"
import * as amqp from "amqplib"
import "dotenv/config"
import threadWorker from "./threadWorker";

export default new (class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinary.config();

        const connection = await amqp.connect(process.env.URL_CONNECT);

        threadWorker.create(process.env.QUEUE_THREAD, connection);
        console.log('WORKER RUNNING');
      })
      .catch((error) => console.log(error));
  }
})();
