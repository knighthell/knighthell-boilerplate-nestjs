# Knighthell Boilerplate NestJS Project

## Description

This project that has implemented the necessary servers in advance for quick service construction.

## Goal

- Monolithic Repositories(Monorepo)
- Loose Coupled System
- Event Driven Architecture
- Using different databases and ORMs for each service
- Using CNCF Product
- Tracing Using OpenTelemetry(Local: Jaeger, Remote: CloudNative(AWS X-Ray, GCP Cloud Trace))
- ~~Hexagonal Architecture~~(TBD)

## Repository

```shell
$ git pull https://github.com/knighthell/knighthell-boilerplate-nestjs --recurse-submodules
```

## Service Common Spec
- [Structure it using IDL](https://github.com/knighthell/knighthell-boilerplate-idl-proto)
- NestJS using Fastify
- Support gRPC
- ~~Support WS~~(TBD)
- Use databases and ORMs suited to each purpose
  - server-place : Postgres extended PostGIS, TypeORM
  - server-user : SQLite on [litestream](https://litestream.io/) (TBD)
    - [rqlite](https://rqlite.io/)
    - [dqlite](https://dqlite.io/)

## Service Diagram

### Phase 1

````mermaid
flowchart TD
    User[fa:fa-user User] <-->|"Req-Res, Unary(gRPC Unary),\nStream(WS, gRPC Steram)"| LB(HAProxy or GCP CLB orAWS ELB or...)
    
    LB --> PathForwarding{Url pattern forwarding}

    PathForwarding <-->|/places/*| ServerPlace[server-place]
    PathForwarding <-->|/users/*| ServerUser[server-user]
    PathForwarding <-->|/auth/*| ServerAuth[server-auth]
    PathForwarding <-->|/social/*| ServerSocial[server-social]
    PathForwarding <-->|/ecommerce/*| ServerEcommerce[server-ecommerce]
    PathForwarding <-->|/chat/*| ServerChat[server-chat]
    PathForwarding <-->|/notification/*| ServerNotification[server-notification]


    ServerPlace <-->|CRUD Events| EventBroker[Nats or\nKafka or\nPulsar or\n ...]
    ServerUser <--> |CRUD Events| EventBroker
    ServerAuth <--> |CRUD Events| EventBroker
    ServerSocial <--> |CRUD Events| EventBroker
    ServerEcommerce <--> |CRUD Events| EventBroker
    ServerChat <--> |CRUD Events| EventBroker
    ServerNotification <--> |CRUD Events| EventBroker
````

### Phase 2

(TBD)

## Server List

- server-place : 장소에 대한 정보 관리 담당, [README](./apps/server-place/README.md)
- ~~server-auth : 인증 정보 담당~~(TBD)
- ~~server-user : 사용자 정보 담당~~(TBD)
- ~~server-ecommerce : 판매상품에 대한 상품등록, 재고관리, 구매 담당~~(TBD)
- ~~server-payment : 결제 담당~~(TBD)
- ~~server-chat : 채팅방, 채팅수발신 담당~~(TBD)
- ~~server-social : 사용자의 피드, 사용자과 관계되어있는 다른 사용자들의 피드들을 정리 등 담당~~(TBD)
- ~~server-notification : 푸쉬메세지 알림, 이메일 알림, 사용자별 푸쉬메세지 목록 등 알림 담당~~(TBD)

## Installation

```bash
$ npm install
```

## Running the apps

```bash
# development
$ npm run start [ServerName]

# watch mode
$ npm run start:dev [ServerName]

# production mode
$ npm run start:prod [ServerName]
```

## Test

```bash
# unit tests
$ npm run test [ServerName]

# e2e tests
$ npm run test:e2e [ServerName]

# test coverage
$ npm run test:cov [ServerName]
```

## License

knighthell(knighthell@gmail.com)
