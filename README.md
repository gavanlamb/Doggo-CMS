# CMS #

We are using a headless CMS that is based on PHP - https://getcockpit.com/

This is due to the fact that it contains appropriate field types as well as it was easy to deploy with easy to read and use API.

### API Documentation ###
* https://getcockpit.com/documentation/api/

## To run ##

* Go to composers to either run production or local setup.
* Run `docker-compose up -d`

Open browser to `http://localhost:9090/install`

## Load Tests ##
Only tests the get and query functionality as that is where most of the load is going to come from
1) Open [load test file](./tests/load.jmx) in jMeter
2) Update cms_key with the api key and cms_url with the url of the cms
3) Save
4) Open terminal in ./tests and run `jmeter -n -t ./load.jmx -l ./results.csv -e -o ./results/`

## CICD ##
This repository contains a GitHub [Action](./.github/workflows/main.yml) that will build push and deploy changes all changes to staging and master changes to production.

### Build ###
Build and tag the docker container using [Dockerfile](./Dockerfile)

`./build.sh 1 doggo-272605`
Order of parameters:
1.   Build Number
2.   GCP key project ID

The first parameter is the account id and the second is the build number
 
### Push ###
Push the created image
`./push.sh 1 doggo-272605`

1.   Build Number
2.   GCP key project ID

### Deploy ###
Deploy the changes to GCP
`./deploy.sh bucket-name 1 staging "mongodb:url" service_account doggo-272605 2cf3c69553c0e1a77d86sdc26f11a52a9584da54 "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----" cicd@doggo-272605.iam.gserviceaccount.com 107595463443820499384 https://accounts.google.com/o/oauth2/auth https://oauth2.googleapis.com/token https://www.googleapis.com/oauth2/v1/certs https://www.googleapis.com/robot/v1/metadata/x509/cicd-781%40doggo-272605.iam.gserviceaccount.com`

The first parameter is the environment name the second is account id and the third is the build number
1.   Terraform state bucket name
2.   Build Number
3.   Environment name 
4.   MongoDB connection string
5.   GCP key account type
6.   GCP key project ID
7.   GCP key ID
8.   GCP key private key
9.   GCP key client email
10.  GCP key client ID
11.  GCP key auth URI
12.  GCP key token URI
13.  GCP key auth provider x509 cert URL
14.  GCP key client x509 cert URL

## Infrastructure ## 
Terraform is used to provision GCP infrastructure resources. Provisioned GCP resources are:
* Cloud run with no authentication invocation
* Cloud run custom domain
* DNS record

The following environments have been setup:
* Production

To add a new environment create a new .tfvars file the same as the environment.

Terraform stores the state in a GCP storage bucket named `doggo-272605-cms-terraform-state`

The database is managed and provisioned using Mongodb atlas. All environments use the same database instance.

## Clone ##
To clone the database and bucket into an environment run the [clone.sh](clone.sh)
`./clone.sh SOURCE_DATABASE_NAME SOURCE_DATABASE_URI SOURCE_DATABASE_USERNAME SOURCE_DATABASE_PASSWORD DESTINATION_DATABASE_NAME DESTINATION_DATABASE_URI DESTINATION_DATABASE_USERNAME DESTINATION_DATABASE_PASSWORD`

### Example ###
`./clone.sh "cms-production" "mongo:url" "cms-admin" "SOURCE_DATABASE_PASSWORD" "cms-devtest-au" "mongo:url" "cms-admin" "DESTINATION_DATABASE_PASSWORD" `

### Assumptions ###
* You have installed [MongoDB tools](https://www.mongodb.com/download-center/community?jmp=docs)
* The destination database have been created

