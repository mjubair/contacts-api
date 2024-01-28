import express from 'express';
import contactRoutes from './routes/contacts.js';

const app = express();

app.use('/', contactRoutes);

export default app;
