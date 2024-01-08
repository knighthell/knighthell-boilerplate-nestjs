import { PinoLogger } from 'nestjs-pino';
import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';

configDotenv();

export const pinoLoggerConfig = {
  pinoHttp: {
    genReqId: (request) =>
      request.headers['x-correlation-id'] || crypto.randomUUID(),
  },
};

export default registerAs('pinoLogger', () => pinoLoggerConfig);

export const pinoLogger = new PinoLogger(pinoLoggerConfig);
