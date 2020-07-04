#!/bin/bash

NORM_USER=$(whoami)

echo "Resetting permissions of CMS folder to www-data ownership"
sudo chown www-data:www-data -R cms
sudo chmod 775 -R cms
sudo adduser $NORM_USER www-data