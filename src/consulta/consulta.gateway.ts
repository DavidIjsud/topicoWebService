/* eslint-disable @typescript-eslint/no-inferrable-types */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class ConsultaGateway {

  @WebSocketServer() server;
  users : number = 0;

  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  @SubscribeMessage('receta')
  async onReceta(client, message) {
    client.broadcast.emit('receta', message);
  }
  

}
