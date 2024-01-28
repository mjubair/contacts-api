import { Router } from 'express';
import crypto from 'crypto';
import User from '../models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
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

export default router;
