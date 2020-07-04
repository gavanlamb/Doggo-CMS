#!/bin/bash

DOCKER_NAME=$(docker ps -aqf "name=$1")

echo "Found docker image: $DOCKER_NAME"

docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name TimeOfDay"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name Category"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name EpisodeShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name CategoryShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name ShowShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name Episode"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name Show"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name RadioStation"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name PromoTile"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-collection --name PromoCarousel"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-singleton --name HomePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-singleton --name WelcomePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-singleton --name ExplorePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp import-singleton --name Config"