#!/bin/bash

DOCKER_NAME=$(docker ps -aqf "name=$1")

docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name TimeOfDay"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name Category"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name EpisodeShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name CategoryShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name ShowShelve"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name Episode"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name Show"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name RadioStation"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name PromoTile"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-collection --name PromoCarousel"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-singleton --name HomePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-singleton --name WelcomePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-singleton --name ExplorePage"
docker exec $DOCKER_NAME /bin/bash -c "/var/www/html/cp export-singleton --name Config"

date=$(date '+%Y-%m-%d_%H_%M_%S')

mkdir -p backups/
cp cms/storage/exports backups/$date/ -rf
