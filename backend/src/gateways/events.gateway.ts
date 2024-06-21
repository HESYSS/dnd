import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('moveElement')
  handleMoveElement(@MessageBody() data: { id: string, x: number, y: number }): void {
    this.server.emit('moveElement', data); 
  }
}
