import { registerAs } from '@nestjs/config';

const natsServers = (process.env.NATS_SERVERS ?? 'nats://localhost:4222')
  .trim()
  .split(',');

const natsConfig = {
  servers: natsServers,
};

export const NatsConfig = registerAs('nats', () => natsConfig);
