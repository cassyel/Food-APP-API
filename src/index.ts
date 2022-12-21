import * as dotenv from 'dotenv';

import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';

dotenv.config();

const MONGO_URL= `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST }:${process.env.MONGOPORT}`;

console.log(MONGO_URL);


mongoose.connect(String(MONGO_URL), { dbName: 'Waiter-APP' })
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
