import * as dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

dotenv.config();

type Key = {
  Key: string;
}

const s3 = new S3Client({
  region: String(process.env.AWS_DEFAULT_REGION),
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  }
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME || '',
    key: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    contentType: function(req, file, cb) {
      cb(null, file.mimetype);
    }
  })
});

export const deleteImageFromS3 = async ({ Key }: Key) => {
  await s3.send(new DeleteObjectCommand({ Bucket: 'food-app-api-production', Key }));
  console.log(`Deleted ${Key} from AWS S3`);

};
