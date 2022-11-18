import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { serverError } from './errorHandling';




mongoose.connect('mongodb://localhost:27017/Waiter-APP', {
  authSource: 'admin',
  auth: {
    password: 'secret',
    username: 'mongoadmin',
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
    app.use(serverError);

  })
  .catch((error) => console.log('Error to connect on mongoDB'));
