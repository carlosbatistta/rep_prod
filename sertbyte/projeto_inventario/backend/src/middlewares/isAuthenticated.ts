import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import prismaClient from '../prisma';

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {

  // Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
    return;
  }

  //é uma array pois o token vem: barrer vjsiovnsovnoanvsaa@@kopk.."token", como não queremos o "barrer", descartamos o primeiro elemento e usamos o token
  //o split seleciona o tipo de separador, nesse caso é o espaço " "
  const [, token] = authToken.split(" ")


  try {
    //Validar esse token.
    const { sub } = verify(
      token,
      process.env.JWT_SECRET

    ) as Payload;

    //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
    (req as Request & { user_id: string }).user_id = sub;

    return next();

  } catch (err) {
    res.status(401).end();
  }



}