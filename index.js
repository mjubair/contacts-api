import mongoose from 'mongoose';
import express from 'express';
import authenticationApp from './services/authentication/index.js';
import contactsApp from './services/contacts/index.js';
import middlewares from './common/middlewares/app.js';
import { authMiddleware } from './common/middlewares/auth.js';

mongoose
  .connect(
    'mongodb+srv://mjubair:x0XxlbNpdMzo6Bi7@mjubair.wo1nakp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  });

// Create the main Express app
const app = express();

middlewares(app);

app.use('/auth', authenticationApp);

app.use(authMiddleware);
app.use('/contacts', contactsApp);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
