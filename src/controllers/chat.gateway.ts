import { 
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';




@WebSocketGateway(81, {
  cors: { 
    origin: '*',
    credentials: true
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  afterInit(server: any): void {
    console.log('Esto se ejecuta cuando inicia')
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket 👌👌👌', );
  }

  handleDisconnect(client: any) {
    console.log('Alguien se fue! chao chao')
  }


  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message') //TODO Backend
    async handleIncommingMessage(
      client: Socket,
      payload: { room: string; message: string, user: string },
    ) {

      const { room, message, user } = payload;
      console.log(payload)
      this.server.to(`room_${room}`).emit('new_message',{message,user});
      
    }

  @SubscribeMessage('event_leave')
    handleRoomLeave(client: Socket, room:string) {
      console.log(`chao room_${room}`)
      client.leave(`room_${room}`);
    }
}
