import { Controller, Post, Body, Param, Get, Res, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AdventureService } from '../service/adventure.service';
import { CreateAdventureDto } from '../dto/create-adventure.dto';
import { Response } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@Controller('adventures')
export class AdventureController {
  constructor(private readonly adventureService: AdventureService) {}

  @Post('create/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async createAdventure(
    @Param('id') GmId: number,
    @Body() createAdventureDto: CreateAdventureDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response
  ) {
    
    
    const { adventureFriends } = createAdventureDto;
    const adventure = await this.adventureService.create(createAdventureDto, GmId, adventureFriends, files);
    res.status(200).send("Успешно создано");
  }

  @Get()
  

  @Get(':id')
  async getAdventure(@Param('id', ParseIntPipe) id: number) {
    const adventure = await this.adventureService.findOne(id);
    return { adventure };
  }

  @Post('delete/:id')
  async deleteAdventure(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.adventureService.removeAdventure(parseInt(id.toString()));
      res.status(200).send("Успешно удалено");
    } catch (error) {
      console.error('Failed to delete adventure', error);
      throw new Error('Failed to delete adventure');
    }
  }
}