import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdventureService } from '../service/adventure.service';

@Controller('images')
export class ImageController {
  constructor(private readonly adventureService: AdventureService) {}

  @Get(':adventureId/:tableName')
  async getImagesByAdventureIdAndTableName(
    @Param('adventureId') adventureId: number,
    @Param('tableName') tableName: string,
    @Res() res: Response,
  ) {
    try {
      const images = await this.adventureService.getImagesByAdventureIdAndTableName(adventureId, tableName);
      res.send(images);
    } catch (error) {
      console.error('Error retrieving images:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
