import { Request, Response } from "express"
import rabbitMq from "../libs/rabbitMq"
import 'dotenv/config';

export default new class ThreadQueue {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = {
                content: req.body.content,
                image: res.locals.filename
            }

            // pakai validasi Joi

            const user = res.locals.loginSession
            const payload = {
                content: data.content,
                image: data.content,
                users: user.Payload.id
            }

            const errorQueue = rabbitMq.sendToMessage(process.env.QUEUE_NAME, payload)

            if(errorQueue) return res.status(500).json({
                messages: errorQueue
            })
            return res.status(201).json({messages: "thread is queue", data: payload})
        } catch (error) {
            throw error
        }
    }
}