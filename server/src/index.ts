import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import connect from './connect';
import errorMiddleware from './middlewares/error.middleware';
import userRouter from './routes/user.route';
import placeRouter from './routes/place.route';
dotenv.config();

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT): 3001;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_OLD_SEVER}`;

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/api/user', userRouter);
app.use('/api/place', placeRouter);

app.use(errorMiddleware);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
connect(uri)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))