import express from 'express';
import morgan from 'morgan';

const middlewares = (app) => {
  app.use(express.json());
  app.use(morgan('dev'));
};

export default middlewares;
