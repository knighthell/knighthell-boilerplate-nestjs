# Knighthell Boilerplate NestJS Project

## Description

This project that has implemented the necessary servers in advance for quick service construction.

### Goal

- Monolithic Repositories(Monorepo)
- Loose Coupled System
- Event Driven Architecture
- Using different databases and ORMs for each service
- Hexagonal Architecture(TBD)

### Service Common Spec
- [Structure it using IDL](https://github.com/knighthell/knighthell-boilerplate-idl-proto)
- NestJS using Fastify
- Support gRPC
- Support WS(TBD)
- Use databases and ORMs suited to each purpose
  - server-place : Postgres extended PostGIS, TypeORM
  - server-user : SQLite on [litestream](https://litestream.io/) (TBD)
    - [rqlite](https://rqlite.io/)
    - [dqlite](https://dqlite.io/)

### Server List

- server-place : 장소에 대한 정보 관리 담당, [README](./apps/server-place/README.md)
- server-auth : 인증 정보 담당(TBD)
- server-user : 사용자 정보 담당(TBD)
- server-ecommerce : 판매상품에 대한 상품등록, 재고관리, 구매 담당(TBD)
- server-payment : 결제 담당(TBD)
- server-chat : 채팅방, 채팅수발신 담당(TBD)
- server-social : 사용자의 피드, 사용자과 관계되어있는 다른 사용자들의 피드들을 정리 등 담당(TBD)
- server-notification : 푸쉬메세지 알림, 이메일 알림, 사용자별 푸쉬메세지 목록 등 알림 담당(TBD)

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
