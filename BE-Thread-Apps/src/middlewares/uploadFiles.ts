import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import * as path from 'path';

export default new (class uploadFiles {
  upload(fieldname: string) {
    const storage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, 'src/uploadFiles');
      },
      filename: (req, file, cb) => {
        const UnixSuffix = Date.now();
        cb(null, `${file.fieldname}-${UnixSuffix}${path.extname(file.originalname)}`);
      },
    });
    const uploadFile = multer({ storage });

    return (req: Request, res: Response, next: NextFunction) => {
      uploadFile.single(fieldname)(req, res, (err: any) => {
        if (err) return res.status(400).json({ messages: 'Error when upload !' });

        if (req.file) {
          res.locals.filename = req.file.filename;
        }
        next();
      });
    };
  }
})();
