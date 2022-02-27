import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorConverter from './middlewares/error-converter';
import errorHandler from './utils/error-handler';
import prisma from './prisma';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT} 🚀`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
});
