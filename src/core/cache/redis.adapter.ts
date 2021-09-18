import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    const redisAdapter = new RedisClient({ host: 'localhost', port: 6379 });

    server.adapter(redisAdapter);
    return server;
  }
}
