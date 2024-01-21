# Nats

## Description

## Testing the Clusters

Now, the following should work: make a subscription on one of the nodes and publish it from another node. You should be able to receive the message without problems.

````shell
$ npm run nats:box:start

or

$ docker run --network nats_network --rm -it --name nats-box natsio/nats-box
````

Inside the container

````shell
# In nats-box container

nats sub -s nats://nats:4222 hello &
nats pub -s "nats://nats-1:4222" hello first
nats pub -s "nats://nats-2:4222" hello second
````

Also stopping the seed node to which the subscription was done, should trigger an automatic failover to the other nodes:

````shell
$ docker-compose -f docker-compose.common.yaml stop nats
````

Output extract
````shell
16e55f1c4f3c:~# 10:47:28 Disconnected due to: EOF, will attempt reconnect
10:47:28 Disconnected due to: EOF, will attempt reconnect
10:47:28 Reconnected [nats://172.18.0.4:4222]
````

Publishing again will continue to work after the reconnection:

````shell
nats pub -s "nats://nats-1:4222" hello again
nats pub -s "nats://nats-2:4222" hello again
````