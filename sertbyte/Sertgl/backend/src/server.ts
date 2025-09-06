import express from 'express'
import type { Request, Response } from 'express'
import { router } from './routes.js'
import 'express-async-errors' 
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(router)
app.use(cors());
app.use((err: Error, req: Request, res: Response): void => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

