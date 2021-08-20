/* eslint-disable @typescript-eslint/no-inferrable-types */
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(3000)
export class ConsultaGateway  implements OnGatewayInit   {
  afterInit(server: any) {
    console.log("Socket inicializado");
    
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }


}
