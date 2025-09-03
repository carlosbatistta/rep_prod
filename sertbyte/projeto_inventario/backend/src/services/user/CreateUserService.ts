import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string;
  email: string;
  password: string;
  profile_id: string;
}

export class CreateUserService {
  async execute({ name, email, password, profile_id }: UserRequest) {
    if (!email) {
      throw new Error("Email is required");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const existingProfile = await prismaClient.profile.findUnique({
      where: { id: profile_id },
    });

    if (!existingProfile) {
      throw new Error("Profile not found");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        profile_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile_id: true,
      },
    });

    return user;
  }
}
