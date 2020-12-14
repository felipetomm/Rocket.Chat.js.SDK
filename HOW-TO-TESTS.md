# How to run tests for build sdk with docker
We need to run this steps:
1. Run mongo container
1. Run RocketChat container
1. Access the started container in http://localhost:3000
1. Configure the server with admin/admin credentials
1. Run yarn test or yarn build

Docker Hub to use for tests: https://hub.docker.com/r/rocketchat/rocket.chat/tags

## Docker - Mongo DB

Run's an instance of mongo with this commands:
```
docker run --name mongo -d mongo:4.0 --smallfiles --replSet rs0 --oplogSize 128
```
## Docker - RocketChat
Here you need to choice an version of RocketChat that you need to use in your enviroment production.  
Example with 3.9.1
```
docker run --name rocketchat_3.9.1 -p 3000:3000 --link mongo --env ROOT_URL=http://localhost:3000 --env MONGO_OPLOG_URL=mongodb://mongo:27017/local --env MONGO_URL=mongodb://mongo:27017/mydb -d rocketchat/rocket.chat:3.9.1
```
Here, the name of container does'nt matter. But we becareful, RocketChat docker images have two "official" repos. [This](https://hub.docker.com/_/rocket-chat?tab=description) is the official and verified by Docker, and [this](https://hub.docker.com/r/rocketchat/rocket.chat) is official by RocketChat group. I used this repo for make my test workspace.

## Enviroment vars
We have created an .env in root folder with this enviroments:
```
ADMIN_USERNAME='admin'
ADMIN_PASS='admin'
```
