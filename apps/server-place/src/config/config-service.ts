import * as process from 'process';

export default () => ({
  env: process.env.NODE_ENV || 'local',
  service: {
    version: process.env.SERVICE_VERSION || 'unknown',
    gcp: {
      run: {
        // Google Cloud Run 사용 시 자동으로 주입되는 환경변수들
        // ref: https://cloud.google.com/run/docs/container-contract?hl=ko#env-vars
        port: process.env.PORT || 'unknown',
        serviceName: process.env.K_SERVICE || 'unknown',
        serviceRevision: process.env.K_REVISION || 'unknown',
        serviceConfigurationName: process.env.K_CONFIGURATION || 'unknown',
      },
    },
    aws: {},
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
  redis: {
    cache: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  },
  elasticSearch: {},
});
