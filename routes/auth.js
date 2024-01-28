import { Router } from 'express';
import crypto from 'crypto';
import User from '../models/user.model.js';
import JWT from 'jsonwebtoken';

const generateAccessToken = (data) => {
  return JWT.sign(data, process.env.JWT_SECRET, {
    expiresIn: '1800s',
  });
};

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({
      status: 'ok',
      data: { _id: user._id, firstName, lastName, email },
    });
  } catch (error) {
    console.log(error);
  }
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
      const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
      });
      res.json({
        status: 'ok',
        data: { accessToken },
      });
    } else {
      res.status(401).json({ status: 'error', error: 'Invalid credentials' });
    }
  });
});

export default router;
