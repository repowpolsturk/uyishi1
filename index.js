import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRoutes';
import PostRoutes from './routes/PostRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/posts', PostRoutes);

createConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(error => console.log(error));
