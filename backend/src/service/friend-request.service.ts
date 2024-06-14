import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateFriendRequestDto } from '../dto/create-friend-request.dto';

@Injectable()
export class FriendRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async sendFriendRequest(createFriendRequestDto: CreateFriendRequestDto) {
    const { receiverId, senderId } = createFriendRequestDto;
    // Проверяем, существует ли уже активный запрос на дружбу между этими пользователями
    const existingRequest = await this.prisma.friendRequest.findFirst({
      where: {
        senderId: parseInt(senderId.toString()),
        receiverId: parseInt(receiverId.toString()),
        status: "pending"
      }
    });

    if (existingRequest) {
      // Если уже существует активный запрос, выбросить ошибку или обработать это каким-то другим способом
      throw new Error('Friend request between these users already exists.');
    }

    // Создаем новый запрос на дружбу
    return this.prisma.friendRequest.create({
      data: {
        senderId : parseInt(senderId.toString()),
        receiverId : parseInt(receiverId.toString()),
      },
    });
  }

  async getReceivedRequests(userId: number) {
    return this.prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: 'pending',
      },
      include: {
        sender: true,
      },
    });
  }

  async respondToFriendRequest(requestId: number, status: 'accepted' | 'declined') {
    return this.prisma.friendRequest.update({
      where: { id: requestId },
      data: { status },
    });
  }

  async findFriendRequestById(requestId: number) {
    return this.prisma.friendRequest.findUnique({
      where: { id: requestId },
    });
  }

  async addFriend(userId: number, friendId: number) {
    await this.prisma.friendship.create({
      data: {
        userId,
        friendId,
      },
    });
    await this.prisma.friendship.create({
      data: {
        userId: friendId,
        friendId: userId,
      },
    });
  }
  
}
