import { Controller, Post, Body, Req, Patch, Param, Get} from '@nestjs/common';
import { FriendRequestService } from '../service/friend-request.service';
import { CreateFriendRequestDto } from '../dto/create-friend-request.dto';
import { UserService } from '../service/user.service';


@Controller('friend-requests')
export class FriendRequestController {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly userService: UserService
  ) {}

  @Post('send')
  async sendFriendRequest(
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    await this.friendRequestService.sendFriendRequest(createFriendRequestDto);

  }


  @Get('received')
  async getReceivedRequests(@Req() req) {
    const userId = req.user.id; 
    return this.friendRequestService.getReceivedRequests(userId);
  }

  @Patch(':id/respond')
  async respondToFriendRequest(@Param('id') requestId: string, @Body('status') status: 'accepted' | 'declined', @Req() req) {
    const response = await this.friendRequestService.respondToFriendRequest(parseInt(requestId), status);
    if (status === 'accepted') {
      const request = await this.friendRequestService.findFriendRequestById(parseInt(requestId));
      await this.friendRequestService.addFriend(request.senderId, request.receiverId);
    }
    return response;
  }
}
