import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketMiddleware } from '../middlewares/logger.middleware';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly webSocketMiddleware: WebSocketMiddleware) {}
  
  afterInit() {
    console.log('WebSocket server initialized');
  }  

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    this.webSocketMiddleware.use(client, () => {});
    client.emit('connection', { clientId: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
