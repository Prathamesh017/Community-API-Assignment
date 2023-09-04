import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import connectDB from './config/database';
import authRouter from './routes/auth.route';
import roleRouter from './routes/role.route';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

var jsonParser = bodyParser.json()
app.use(jsonParser);


app.get('/',(req: Request, res: Response):void => {
  res.send('Welcome To Community API');
});


app.use("/v1/auth",authRouter)
app.use("/v1/role",roleRouter)



app.listen(PORT, async (): Promise<void> => {
  try {
    await connectDB();
    console.log('Server is Running on Port', PORT);
  } catch (error) {
    console.log(error);
  }
});