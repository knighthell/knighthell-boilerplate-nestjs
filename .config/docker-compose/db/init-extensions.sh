#!/bin/bash
set -e

# Install pg_uuidv7
#apt-get -y update; apt-get -y install curl
#cd "$(mktemp -d)"
#curl -LO "https://github.com/fboulnois/pg_uuidv7/releases/download/v1.4.1/{pg_uuidv7.tar.gz,SHA256SUMS}"
#tar xf pg_uuidv7.tar.gz
#sha256sum -c SHA256SUMS
#PG_MAJOR=$(pg_config --version | sed 's/^.* \([0-9]\{1,\}\).*$/\1/')
#cp "$PG_MAJOR/pg_uuidv7.so" "$(pg_config --pkglibdir)"
#cp pg_uuidv7--1.4.sql pg_uuidv7.control "$(pg_config --sharedir)/extension"
#psql -c "CREATE EXTENSION pg_uuidv7;"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_USER";
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	CREATE EXTENSION IF NOT EXISTS "pg_uuidv7";
EOSQL