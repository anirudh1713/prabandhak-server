import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} 🚀`);
});
