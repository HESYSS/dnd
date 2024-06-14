import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MonsterService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.monster.findMany();
  }
}