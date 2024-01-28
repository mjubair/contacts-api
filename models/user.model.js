import mongoose from 'mongoose';

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

export default User;
