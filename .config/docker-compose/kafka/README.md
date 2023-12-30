# Kafka Kraft Confluent all in one docker-compose

## Getting start

### Step 1. Permission Setting

Before docker-compose up for docker-compose.kafka.yaml, update_run.sh file need set permission.

````bash
$ chmod 755 .kafka/update_run.sh
````

### Step 2. Docker Compose UP

This command is defined in the script item of package.json.

so, You can execute run command

````bash
$ npm run kafka:up
````

also, You can execute docker-compose up command

````bash
$ docker-compose -f .config/docker-compose/kafka/docker-compose.kafka.yaml up -d
````

### Step 3. Docker Compose Down

This command is also defined in the script item of package.json.

so, You can execute run command

````bash
$ npm run kafka:down
````

also, You can execute docker-compose up command

````bash
$ docker-compose -f .config/docker-compose/kafka/docker-compose.kafka.yaml down -v
````