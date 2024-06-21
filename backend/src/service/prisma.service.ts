import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../my-prisma-project/node_modules/@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); 
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  
  async getPlayersInAdventure(adventureId: number): Promise<number[]> {
    const adventure = await this.adventure.findUnique({
      where: { id: adventureId },
      include: { players: { select: { id: true } } } 
    });
    return adventure.players.map(player => player.id);
  }

  
}
