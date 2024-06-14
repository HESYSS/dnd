import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '../../my-prisma-project/node_modules/@prisma/client/default';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async getFriends(userId: number) {
    return this.prisma.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: true,
      },
    });
  }

  async removeFriend(userId: number, friendId: number) {
    await this.prisma.$transaction([
      this.prisma.friendship.deleteMany({
        where: {
          OR: [
            {
              userId: parseInt(userId.toString()),
              friendId: parseInt(friendId.toString()),
            },
            {
              userId: parseInt(friendId.toString()),
              friendId: parseInt(userId.toString()),
            },
          ],
        },
      }),
      this.prisma.friendRequest.deleteMany({
        where: {
          OR: [
            { senderId: parseInt(userId.toString()), 
              receiverId: parseInt(friendId.toString()) },
            { senderId: parseInt(friendId.toString()), 
              receiverId: parseInt(userId.toString()) },
          ],
        },
      }),
    ]);
  }

  async addFriend(userId: number, friendId: number) {
    // Предположим, что у вас есть модель Friend с соответствующими полями в вашей схеме Prisma
    return this.prisma.friendship.create({
      data: {
        userId,
        friendId,
      },
    });
  }
}