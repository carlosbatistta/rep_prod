import express from 'express'
import type { Request, Response } from 'express';
import { router } from './routes.js';

const app = express();

app.use(express.json());
app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

