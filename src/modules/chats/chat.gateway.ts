import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import { createAdapter } from 'socket.io-redis';

@WebSocketGateway(81, {
  namespace: 'chat',
  cors: {
    origin: ['http://10.0.2.2:8081'],
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private redisClient: Redis;
  private redisClient2: Redis;
  private readonly redisAdapter: any;

  constructor() {
    this.redisClient = new Redis(); // Instantiate Redis client
    this.redisClient2 = new Redis(); // Instantiate Redis client
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    console.log(`User ${userId} joined the chat`);
    this.subscribe(userId, (msg) => {
      client.emit('client', msg);
    });
  }

  @SubscribeMessage('send')
  handleSend(client: Socket, toUserId: string) {
    this.sendMessage(toUserId, '라라라라라라라라');
  }

  async sendMessage(channel: string, message: string): Promise<void> {
    await this.redisClient2.publish(channel, message); // Publish message to a channel
  }

  async subscribe(
    channel: string,
    callback: (message: string) => void,
  ): Promise<void> {
    await this.redisClient.subscribe(channel);
    this.redisClient.on('message', (channel, message) => {
      callback(message);
    });
  }
}
