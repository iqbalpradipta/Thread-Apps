import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default new (class JwtAuth {
  Auth(req: Request, res: Response, next: NextFunction): Response {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ messages: 'You need token first' });
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.SECRET_KEY;

    try {
      const jwtLogin = jwt.verify(token, secret);

      res.locals.loginSession = jwtLogin;
      next();
    } catch (error) {
      res.status(401).json({ messages: 'token invalid!' });
    }
  }
})();
