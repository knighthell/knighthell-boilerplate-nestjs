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

#### Diagram

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

### Phase 2 (TBD)

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
    
    EventBroker <--> ConsumerPlace[consumer-place]
    EventBroker <--> ConsumerUser[consumer-user]
    EventBroker <--> ConsumerAuth[consumer-auth]
    EventBroker <--> ConsumerSocial[consumer-social]
    EventBroker <--> ConsumerEcommerce[consumer-ecommerce]
    EventBroker <--> ConsumerChat[consumer-chat]
    EventBroker <--> ConsumerNotification[consumer-notification]
````


## Server List

- Place(Spatial Information) Domain
  - server-place : Place Information Serving and Management, [README](./apps/server-place/README.md)
  - ~~consumer-place : TBD (Operates integrated into **server-place** and separates when necessary.)~~
- Auth Domain
  - ~~server-auth : Auth Information Serving and Management~~(TBD)
  - ~~consumer-auth : TBD (Operates integrated into **server-auth** and separates when necessary.)~~
- User Domain
  - ~~server-user : User Information Serving and Management~~(TBD)
  - ~~consumer-user : TBD (Operates integrated into **server-user** and separates when necessary.)~~
- E-Commerce Domain
  - ~~server-ecommerce : E-Commerce(Product, Inventory, Order) Information Serving and Management~~(TBD)
  - ~~consumer-ecommerce : TBD (Operates integrated into **server-ecommerce** and separates when necessary.)~~
- Payment Domain
  - ~~server-payment : Payment Information Serving and Management~~(TBD)
  - ~~consumer-payment : TBD (Operates integrated into **server-payment** and separates when necessary.)~~
- Chat Domain
  - ~~server-chat : Chat Information Serving and Management~~(TBD)
  - ~~consumer-chat : TBD (Operates integrated into **server-chat** and separates when necessary.)~~
  - ~~broadcast-chat : Broadcasting Chat Content each ChatLines~~(TBD)
- Social Domain
  - ~~server-social : Social Information Serving and Management~~(TBD)
  - ~~consumer-social : TBD (Operates integrated into **server-social** and separates when necessary.)~~
- Notification Domain
  - ~~server-notification : Notification(Push, Email) Information Serving and Management~~(TBD)
  - ~~consumer-notification : TBD (Operates integrated into **server-notification** and separates when necessary.)~~

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
