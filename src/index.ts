import * as dotenv from 'dotenv';

import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';

dotenv.config();


mongoose.connect(String(process.env.DB_URL), {
  authSource: process.env.DB_AUTH,
  auth: {
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
  },
})
  .then(() => {
    const app = express();
    const port = 3001;

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    app.use(express.json());
    app.use(router);
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(serverError);

  })
  .catch(() => console.log('Error to connect on mongoDB'));
