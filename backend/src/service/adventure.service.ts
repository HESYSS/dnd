import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAdventureDto } from '../dto/create-adventure.dto';
import { Adventure } from '@prisma/client';
import fs from 'fs'

@Injectable()
export class AdventureService {
  constructor(private prisma: PrismaService) {}

  async create(createAdventureDto: CreateAdventureDto, GmId: number, playerIds: number[] = [], files: Array<Express.Multer.File>) {
    console.log('Player IDs:', playerIds);
    

    const fileData = files.reduce((acc, file) => {
      if (file.fieldname === 'battlefieldMaps') {
        if (!acc[file.fieldname]) {
          acc[file.fieldname] = [file.buffer];
        } else {
          acc[file.fieldname].push(file.buffer);
        }
      } else {
        acc[file.fieldname] = file.buffer.toString('base64');
      }
      return acc;
    }, {});
    console.log('Received files in service:', fileData);
    const adventure = await this.prisma.adventure.create({
      data: {
        name: createAdventureDto.adventureName,
        description: createAdventureDto.adventureDescription,
        image: fileData['adventureImage'],
        customMonsters: fileData['customMonsters'],
        battlefieldMaps: fileData['battlefieldMaps'],
        gmId: parseInt(GmId.toString()), // Преобразуем GmId в число
        players: { // Добавляем пользователей в приключение
          connect: playerIds.map(id => ({ id: Number(id)  })) // Связываем пользователей по их идентификаторам
        }
      },
    });

    return adventure;
  }

  async getImagesByAdventureIdAndTableName(adventureId: number, tableName: string) {
    return this.prisma.adventure.findUnique({
      where: { id: parseInt(adventureId.toString()) },
      select: { [tableName]: true },
    });
  }

  async findAll(): Promise<Adventure[]> {
    return this.prisma.adventure.findMany({
      include: {
        players: true, // Включение отношения players
      },
    });
  }
  
  async isInAdventure(userId: number, adventureId: number): Promise<number[]> {
    const playersInAdventure = await this.prisma.getPlayersInAdventure(adventureId);
    return playersInAdventure;
  } 

  async findOne(id: number): Promise<Adventure> {
    return this.prisma.adventure.findFirst({
      where: {
        id,
      },
      include: {
        players: true, // Включение отношения players
      },
    });
  }

  async removeAdventure(adventureId: number): Promise<void> {
    try {
      await this.prisma.adventure.delete({
        where: {
          id: adventureId,
        },
      });
    } catch (error) {
      console.error('Failed to delete adventure', error);
      throw new Error('Failed to delete adventure');
    }
  }
}
