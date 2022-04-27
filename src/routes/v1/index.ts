import express, {Router} from 'express';
import {authRouter} from './auth.routes';
import {workspaceRouter} from './workspace.routes';

interface IRoute {
  path: string;
  route: Router;
}

export const router = express.Router();

const routes: IRoute[] = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/workspace',
    route: workspaceRouter,
  },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});
