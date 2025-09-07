import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import prismaClient from "../prisma/index.js";

interface Payload {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
  access_nivel: number
): Promise<void> {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
    return Promise.resolve();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    (req as Request & { user_id: string }).user_id = sub;

    const user = await prismaClient.user.findFirst({ where: { id: sub } });

    if (!user) {
      res.status(401).end();
      return Promise.resolve();
    }

    const profile = await prismaClient.profile.findFirst({ where: { id: user.profile_id } });

    if (profile.nivel <= access_nivel) {
      res.status(401).end();
      return Promise.resolve();
    }

    return next(); // 🔹 Importante: Garantir que `next()` seja chamado
  } catch (err) {
    res.status(401).end();
    return Promise.resolve(); // 🔹 Sempre usar `return` para evitar erros de tipo
  }
}

