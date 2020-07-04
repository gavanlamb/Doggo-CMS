#!/bin/bash

SOURCE_DATABASE_NAME=${1}
SOURCE_DATABASE_HOST=${2}
SOURCE_DATABASE_USERNAME=${3}
SOURCE_DATABASE_PASSWORD=${4}
DESTINATION_DATABASE_NAME=${5}
DESTINATION_DATABASE_HOST=${6}
DESTINATION_DATABASE_USERNAME=${7}
DESTINATION_DATABASE_PASSWORD=${8}

mongodump --host $SOURCE_DATABASE_HOST --ssl --username $SOURCE_DATABASE_USERNAME --password $SOURCE_DATABASE_PASSWORD --authenticationDatabase admin --db $SOURCE_DATABASE_NAME
mongorestore --host $DESTINATION_DATABASE_HOST --ssl --username $DESTINATION_DATABASE_USERNAME --password $DESTINATION_DATABASE_PASSWORD --authenticationDatabase admin --db $DESTINATION_DATABASE_NAME --nsFrom "$SOURCE_DATABASE_NAME.*" --nsTo "$DESTINATION_DATABASE_NAME.*" "dump/$SOURCE_DATABASE_NAME"