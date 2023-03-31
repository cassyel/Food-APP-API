require('express-async-errors');
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';
import swagerDocs from './openapi.json';
import cors from 'cors';
import { productsImages } from './app/controller/products/productsImages';

import htpp from 'node:http';
import { Server } from 'socket.io';

const app = express();

const server = htpp.createServer(app);
export const io = new Server(server);


dotenv.config();

mongoose
  .connect(String(process.env.MONGOATLAS), { dbName: String(process.env.DATABASENAME) })
  .then(() => {
    const port = process.env.PORT || 3001;

    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.use('/uploads/images/:imagePath', productsImages);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swagerDocs));
    app.use(serverError);

    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => console.log('Error to connect on mongoDB'));
