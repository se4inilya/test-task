import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { authMiddleware } from './middlewares/auth';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import { DEFAULT_PORT } from './config/constants';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use('/login', authRoute);
app.use('/projects', authMiddleware, projectRoute);

const port = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
