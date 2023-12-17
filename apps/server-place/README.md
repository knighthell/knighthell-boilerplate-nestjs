# Server Place

## Description

위치 기반 정보를 Place라는 도메인 명칭으로 정해 해당 도메인에 대한 서비스를 제공해주는 서버.

## Spec
- Port In
  - Http API (Http/2)
  - gRPC
  - WS (TBD)
  - Nats Event Consume
- Port Out
  - RDBMS
    - TypeORM
    - Postgres extended PostGIS
  - Redis
  - ElasticSearch
  - Nats Event Produce

## Running Server
````shell
$ npm run start server-place
````
