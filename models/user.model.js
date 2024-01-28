import mongoose from 'mongoose';
import crypto from 'crypto';

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
