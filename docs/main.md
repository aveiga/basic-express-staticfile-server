# How to develop enterprise grade NodeJS microservice, using Express and Typescript

## Introduction

It's not the purpose of this blog series to go over the definition of Microservices or Cloud Native applications. If their main characteristics are not enterily clear to you, I suggested the following sources as an introduction:

- [martinfowler.com](https://martinfowler.com/articles/microservices.html)
- [microservices.io](https://microservices.io/index.html)
- [12factor.net](https://12factor.net)

Who is this blog series for, then? This is for you, if:

- you're using (or about to use) NodeJS for microservice development
- you're working on an enterprise environment, or want/need to follow SW development best practices
- you want to scale your SW development practices

## Context

Enterprise grade SW development often presents developers and architects with a number of challenges that one wouldn't find otherwise: developing microservices at the enterprise scale, with multiple teams geographically distributeed, means that your SW development practices need to be well defined and understood by all teams. On top of that, there may be a number of standards that the products developed by those teams may need to comply with, namely cyber-security standards. Cyber-security threats, requirements related to high availability and geographical redundancy and challenging SLAs have the potential to drive development teams down a rabbit hole of technical doubts. This blog series presents a practical and opinionated recipee for structured and standardized microservice development with NodeJS. We'll be covering:

- Authentication and Authorization using OAuth v2
- RESTfull APIs
- Logging
- Messaging using AMQP
- Serving UI assets
- Websockets
- Persistence with Relation Databases
- Input Validation
- Rate Limiting
- Error Handling
- DB Versioning
- Testing
- API Documentation?
- Monitoring

## Getting Started

###
