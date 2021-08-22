# basic-express-staticfile-server

## Topics covered

- ✅ REST
- ✅ [Messaging using AMQP](https://www.npmjs.com/package/amqplib)
- ✅ [Input Validation](https://express-validator.github.io/docs/)
- [Axios](https://blog.openreplay.com/fetch-vs-axios-which-is-the-best-library-for-making-http-requests)
- ✅ [DB with PostgreSQL](https://typeorm.io/#/)
- ✅ [DEV DB with SQLite](https://typeorm.io/#/)
- [DB Versioning](https://typeorm.io/#/migrations)
- ✅ Authentication and Authorization using OAuth v2
- [Service Discovery](https://github.com/jquatier/eureka-js-client)
- ✅ [Rate Limiting](https://github.com/animir/node-rate-limiter-flexible/wiki/Express-Middleware)
- ✅ [Logging](https://geshan.com.np/blog/2021/01/nodejs-logging-library/)
- ✅ Error Handling
- ✅ [Testing](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
- API Documentation
- ✅ [Monitoring](https://stackabuse.com/nodejs-application-monitoring-with-prometheus-and-grafana)
- ✅ [Websockets](https://www.npmjs.com/package/ws)
- Developing and serving UI fragments
- ✅ Serving UI assets

## To cleanup

- keycloak.json > get values from env vars
- logger > define format
- try to use pure oauth libs
- Websocket > keep alive
- rate limiting > redis

## FAQ

### How to get Keycloak to run on Docker Compose on M1 MacBooks 💻?

Quick answer:

- build the image locally (more info here: https://github.com/docker/for-mac/issues/5310)
- mount the pgdata volume to a directory below your home folder (or, preferably, in the repo folder)

### How to access the RabbitMQ Management UI?

- Go to http://localhost:15672/ using username and password: guest

## Topics not covered

- [Typescript](https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/ and https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/)
