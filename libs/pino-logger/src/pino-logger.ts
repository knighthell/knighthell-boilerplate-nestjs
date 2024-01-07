import { PinoLogger } from 'nestjs-pino';

const pinoLogger = new PinoLogger({
  pinoHttp: {
    genReqId: (request) =>
      request.headers['x-correlation-id'] || crypto.randomUUID(),
  },
});

export default pinoLogger;
