import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { UserService } from '../service/user.service';
import { PrismaService } from '../service/prisma.service';
import { FriendshipService } from '../service/friendship.service';
import { FriendRequestService } from '../service/friend-request.service';
import { FriendshipController } from '../controller/friendship.controller';
import { FriendRequestController } from '../controller/friend-request.controller';
import { AdventureController } from '../controller/adventure.controller';
import { AdventureService } from '../service/adventure.service';
import { MonsterService } from '../service/monster.service';
import { AppGateway } from '../controller/WebSocket.controller';
import { EventsModule } from './events.module';
import { WebSocketMiddleware } from '../middlewares/logger.middleware';
import { ImageController } from '../controller/image.controller';


@Module({
  imports: [ EventsModule ],
  controllers: [AppController, FriendshipController, FriendRequestController, AdventureController, ImageController],
  providers: [
    PrismaService,
    UserService,
    FriendshipService,
    FriendRequestService,
    AdventureService,
    MonsterService,
    AppGateway,
    WebSocketMiddleware
  ],
}) 
export class AppModule {}
