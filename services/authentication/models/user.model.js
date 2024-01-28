import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    salt: String,
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  { timeStamp: true }
);

userSchema.pre('save', async function (next) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .createHash('sha256', salt)
    .update(this.password)
    .digest('hex');

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
