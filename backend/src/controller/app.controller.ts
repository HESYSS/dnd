import { Controller, Post, Get, Body, Render, Req, Res, Param, Query } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { FriendRequestService } from '../service/friend-request.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { WebSocketMiddleware } from 'src/logger.middleware';
import { AdventureService } from 'src/service/adventure.service';
import { MonsterService } from 'src/service/monster.service';
import { AppGateway } from './WebSocket.controller';

@Controller()
export class AppController {
  private appGateway: AppGateway;
  constructor(
    private readonly userService: UserService,
    private readonly adventureService: AdventureService,
    private readonly monsterService: MonsterService,
    private readonly friendRequestService: FriendRequestService,
    private readonly webSocketMiddleware: WebSocketMiddleware,
  ) {this.appGateway = new AppGateway(this.webSocketMiddleware);}


  @Post('entrance')
  async getUsers(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
  const users = await this.userService.getUsers();
  const user = users.find(
    (user) => user.username === createUserDto.username && user.password === createUserDto.password
  );
  const userIsRegistered = !!user;
  const userId = user ? user.id : null;
  if (userIsRegistered) {
    return res.json(userId);
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}

@Get('entrances/:id')
async entrancePage(@Param('id') id: number, @Res() res: Response) {
  const users = await this.userService.getUsers();
  const userIsRegistered = true;
  const userId = parseInt(id.toString());
  const friendRequests = userIsRegistered ? await this.friendRequestService.getReceivedRequests( userId) : [];
  const friends = userIsRegistered ? await this.userService.getFriends(userId) : [];
  const adventures = await this.adventureService.findAll();
  const monsters = await this.monsterService.findAll();

  const isInAdventure = await Promise.all(adventures.map(async (adventure) => {
    return {
      adventure,
      isInAdventure: await this.adventureService.isInAdventure(userId, adventure.id),
    };
  }));
  return res.json({ userIsRegistered, adventures: isInAdventure, users, friendRequests, friends, userId, monsters });
}


  @Post('registration')
  async registerUser(@Body() createUserDto: CreateUserDto, @Req() req, @Res() res: Response) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      const userIsRegistered = true;
      const userId = newUser.id;
      return res.json(userId);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  


  @Get('adventures/:id')
  async getAdventureById(@Param('id') id: string) {
    const idParts = id.split('s');
    const adventureID = parseInt(idParts[0]);
    const userId = parseInt(idParts[1]);
    const adventure = await this.adventureService.findOne(adventureID);
    if (!adventure) {
      console.log('Adventure not found');
      return null; // или что-то еще, что будет обозначать отсутствие приключения
    }
    return { adventure, userId };
  }

}
