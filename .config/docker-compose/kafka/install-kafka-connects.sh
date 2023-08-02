#!/bin/bash
# Install connector plugins
# This will by default install into /usr/share/confluent-hub-components/
# so make sure that this path is added to the CONNECT_PLUGIN_PATH in the environment variables.

## Install Kafka JDBC Connector
confluent-hub install --no-prompt confluentinc/kafka-connect-jdbc:10.5.1
# By default, kafka-connect-jdbc doesn't have mysql connector so we download and copy the connector jar file here.
wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.28.tar.gz
tar xf mysql-connector-java-8.0.28.tar.gz
cp mysql-connector-java-8.0.28/mysql-connector-java-8.0.28.jar /usr/share/confluent-hub-components/confluentinc-kafka-connect-jdbc/lib/

## Install Kafka ElasticSearch Connector
confluent-hub install --no-prompt confluentinc/kafka-connect-elasticsearch:13.1.0

## Install Debezium MySQL CDC Connector
confluent-hub install --no-prompt debezium/debezium-connector-mysql:1.9.3

# Launch the Kafka Connect worker
/etc/confluent/docker/run &

# Don't exit
sleep infinity
