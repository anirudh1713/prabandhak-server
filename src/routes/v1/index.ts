import express from 'express';
import {authRouter} from './auth.route';

export const router = express.Router();

const routes = [
  {
    path: '/auth',
    rotue: authRouter,
  },
];

routes.forEach(route => {
  router.use(route.path, route.rotue);
});
