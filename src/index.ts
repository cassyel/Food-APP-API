import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';
import swagerDocs from './openapi.json';
import cors from 'cors';
import { productsImages } from './app/controller/products/productsImages';

dotenv.config();

mongoose
  .connect(String(process.env.MONGOATLAS), { dbName: String(process.env.DATABASENAME) })
  .then(() => {
    const app = express();
    const port = process.env.PORT || 3001;


    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.use('/uploads/images/:imagePath', productsImages);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swagerDocs));
    app.use(serverError);
  })
  .catch(() => console.log('Error to connect on mongoDB'));
