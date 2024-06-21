import { Injectable, NestMiddleware } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketMiddleware implements NestMiddleware {
  use(socket: Socket, next: () => void) {
    console.log('WebSocket connected:', socket.id);
    next();
  }
}
