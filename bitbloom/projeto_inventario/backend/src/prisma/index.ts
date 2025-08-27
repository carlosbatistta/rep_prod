import { PrismaClient } from '@prisma/client'

//acessar BD, realizar todas as operações.
const prismaClient = new PrismaClient();

export default prismaClient;