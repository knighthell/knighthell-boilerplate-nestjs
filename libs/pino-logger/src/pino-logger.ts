import { PinoLogger } from 'nestjs-pino';
import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { Params } from 'nestjs-pino';

configDotenv();

const { BASE_PATH, CLUSTER_MODE, LOG_LEVEL, NODE_ENV } = process.env;

export const pinoLoggerConfig = {
  pinoHttp: {
    autoLogging: true,
    base: CLUSTER_MODE === 'true' ? { pid: process.pid } : {},
    customAttributeKeys: {
      responseTime: 'timeSpent',
    },
    formatters: { level: (level) => ({ level }) },
    level: LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'trace'),
    genReqId: (request) => {
      return (
        request.headers['x-correlation-id'] ||
        request.headers['x-request-id'] ||
        crypto.randomUUID()
      );
    },
    serializers: {
      req: (request) => {
        const raw = request.raw;
        return {
          id: request.id,
          method: request.method,
          url: request.url,
          body: request.raw.body,
          // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
          // headers: request.headers,
        };
      },
      res: (response) => {
        return {
          statusCode: response.statusCode,
        };
      },
    },
    transport:
      NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
              errorLikeObjectKeys: ['err', 'error'],
            },
          }
        : null,
  },
} as Params;

export default registerAs('pinoLogger', () => pinoLoggerConfig);

export const pinoLogger = new PinoLogger(pinoLoggerConfig);
