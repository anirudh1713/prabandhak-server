import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorConverter from './middlewares/error-converter';
import errorHandler from './utils/error-handler';
import { router } from './routes/v1';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/v1', router);

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} 🚀`);
});
