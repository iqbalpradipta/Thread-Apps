import { Request, Response } from "express"
import rabbitMq from "../libs/rabbitMq"
import 'dotenv/config';
import { promisify } from "util";
import * as fs from 'fs';
import cloudinaryConfig from '../libs/cloudinary';

const deleteFile = promisify(fs.unlink);

export default new class ThreadQueue {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const user = res.locals.loginSession
            const data = {
                content: req.body.content,
                image: res.locals.filename
            }

            let img = null;
            if (req.file) {
                data.image = res.locals.filename;
                const cloudinary = await cloudinaryConfig.destination(data.image);
                data.image = cloudinary;
                await deleteFile(`src/uploadFiles/${res.locals.filename}`);
            } else {
                data.image = img;
            }

            // pakai validasi Joi

            const payload = {
                content: data.content,
                image: res.locals.filename,
                users: user.Payload.id
            }

            const errorQueue = rabbitMq.sendToMessage(process.env.QUEUE_THREAD, payload)

            if(errorQueue) return res.status(500).json({
                messages: errorQueue
            })
            return res.status(201).json({messages: "thread is queue", data: payload})
        } catch (error) {
            throw error
        }
    }
}