import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getFriends(userId: number | null) {
    if (userId === null) {
      return [];
    }
    return this.prisma.friendship.findMany({
      where: {
        userId: userId,
      },
      include: {
        friend: true,
      },
    });
  }
}
