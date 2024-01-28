import express from 'express';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://mjubair:x0XxlbNpdMzo6Bi7@mjubair.wo1nakp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const app = express();

app.get('/', (req, res) => {
  res.json({ status: 'ok', data: { message: 'Hello World!' } });
});

app.post('/register', (req, res) => {
  res.json({ status: 'ok', data: { message: 'Hello World!' } });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
