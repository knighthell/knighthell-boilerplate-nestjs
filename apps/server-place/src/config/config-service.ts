import * as process from 'process';

export default () => ({
  env: process.env.NODE_ENV || 'local',
  service: {
    version: process.env.SERVICE_VERSION || 'unknown',
  },
  http: {
    port: process.env.SERVER_PLACE_HTTP_PORT || 3003,
  },
  grpc: {
    port: process.env.SERVER_PLACE_GRPC_PORT || 30003,
  },
  nats: {
    host: process.env.SERVER_PLACE_NATS_HOST || 'localhost',
    port: process.env.SERVER_PLACE_NATS_PORT || 4222,
  },
  kafka: {
    host: process.env.KAFKA_BROKER_HOST || 'localhost',
    port: process.env.KAFKA_BROKER_PORT || 9092,
  },
  postgres: {
    host: process.env.PLACE_DB_POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.PLACE_DB_POSTGRES_PORT, 10) || 5433,
    user: process.env.PLACE_DB_POSTGRES_USERNAME || 'place',
    password: process.env.PLACE_DB_POSTGRES_PASSWORD || 'place1234!',
    name: process.env.PLACE_DB_POSTGRES_DATABASE_NAME || 'place',
    timezone: process.env.DB_TIMEZONE || 'Z',
  },
  redis: {
    cache: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  },
  elasticSearch: {},
});
