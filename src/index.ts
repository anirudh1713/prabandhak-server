import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorConverter from './middlewares/error-converter';
import errorHandler from './utils/error-handler';
import { router } from './routes/v1';
import { jwtStrategy } from './config/passport';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/v1', router);

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} 🚀`);
});

process.on('SIGTERM', () => process.exit());
