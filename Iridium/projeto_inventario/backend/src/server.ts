import express, { Request, Response, NextFunction } from 'express';
import { connectToSqlServer, disconnectSqlServer } from './database/sqlServer';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

// Inicializar conexão ao banco de dados no início
(async () => {
  try {
    await connectToSqlServer();
    console.log('Servidor online!!!!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1); // Finalizar aplicação em caso de erro crítico
  }
})();

app.listen(3333);