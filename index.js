import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { timeStamp } from 'console';

mongoose
  .connect(
    'mongodb+srv://mjubair:x0XxlbNpdMzo6Bi7@mjubair.wo1nakp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  });

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    salt: String,
    password: String,
  },
  { timeStamp: true }
);

const User = mongoose.model('User', userSchema);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', data: { message: 'Hello World!' } });
});

// ...

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .createHash('sha256', salt)
    .update(password)
    .digest('hex');

  const user = new User({
    firstName,
    lastName,
    email,
    salt,
    password: hashedPassword,
  });

  user.save();
  res.status(201).json({
    status: 'ok',
    data: { _id: user._id, firstName, lastName, email },
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(401).json({ status: 'error', error: 'Invalid credentials' });
    }

    const hashedPassword = crypto
      .createHash('sha256', user.salt)
      .update(password)
      .digest('hex');

    if (user.password === hashedPassword) {
      res.json({
        status: 'ok',
        data: { message: 'User logged in successfully' },
      });
    } else {
      res.status(401).json({ status: 'error', error: 'Invalid credentials' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
