import * as dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';
import { categoriesSeeder } from './app/seeder/Category';

import swagerDocs from './openapi.json';

dotenv.config();

mongoose
  .connect(String(process.env.MONGOATLAS), { dbName: 'Food-APP' })
  .then(() => {
    const app = express();
    const port = process.env.PORT || 3001;


    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    app.use(express.json());
    app.use(router);
    app.use('/uploads/images', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use('/', swaggerUi.serve, swaggerUi.setup(swagerDocs));
    app.use(serverError);
    categoriesSeeder();
  })
  .catch(() => console.log('Error to connect on mongoDB'));
