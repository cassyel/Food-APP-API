import * as dotenv from 'dotenv';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';
import swagerDocs from './openapi.json';
import cors from 'cors';

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
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'https://food-app-api-production.up.railway.app/'); // update to match the domain you will make the request from
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    app.use(router);
    app.use('/uploads/images', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use('/', swaggerUi.serve, swaggerUi.setup(swagerDocs));
    app.use(serverError);
  })
  .catch(() => console.log('Error to connect on mongoDB'));
