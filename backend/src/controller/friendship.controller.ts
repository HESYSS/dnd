import { Controller, Post, Get, Body, Req, Delete, Param, Res } from '@nestjs/common';
import { FriendshipService } from '../service/friendship.service';
import { CreateFriendshipDto } from '../dto/create-friendship.dto';
import { Response } from 'express';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('add')
  async addFriend(@Body() createFriendshipDto: CreateFriendshipDto, @Req() req) {
    const userId = req.user.id; 
    return this.friendshipService.addFriend(userId, createFriendshipDto.friendId);
  }

  @Get('friends')
  async getFriends(@Req() req) {
    const userId = req.user.id; 
    return this.friendshipService.getFriends(userId);
  }

  @Post('remove/:id')
  async removeFriend(@Param('id') friendId: number, @Req() req, @Res() res: Response, @Body() createFriendshipDto: CreateFriendshipDto) {
    const userId = friendId; 

    await this.friendshipService.removeFriend(userId, createFriendshipDto.friendId);
    
    return res.redirect('/entrance');
  }
}
