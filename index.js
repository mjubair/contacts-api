import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';

mongoose
  .connect(
    'mongodb+srv://mjubair:x0XxlbNpdMzo6Bi7@mjubair.wo1nakp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', data: { message: 'Hello World!' } });
});

app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
