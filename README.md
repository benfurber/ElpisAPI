# Elpis API

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

### Setup

[Download Docker](https://docs.docker.com/docker-for-mac/install/)

```sh
# Pull down prisma's latest docker image for heroku (currently 1.34.8)
docker pull prismagraphql/prisma:1.34.8-heroku

# Run docker
docker-compose up -d
```

```sh
# 1. Setup packages
yarn install

# 2. Create .env file at the project root folder.
# Check .env.sample file for reference

# 3. Get token for the env file
yarn prisma token

# 4. (Add the token to the env file)

# 5. Setup the DB
yarn prisma deploy
```

## Running

### For production

```sh
yarn start
```

### For local

```sh
# 0. Install packages
yarn install

# 1. Run docker
docker-compose up -d

# 2. Start server (runs on http://localhost:4000)
yarn dev
```

## Documentation

### Commands

- `yarn start` starts GraphQL server on `http://localhost:4000`
- `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

## Features from running the boilerplate

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Static type generation**: TypeScript types for GraphQL queries & mutations are generated in a build step
- **Authentication**: Signup and login workflows are ready to use for your users
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup
- **Realtime updates**: Support for GraphQL subscriptions

Read more about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Copyright License

Copyright (C) Ben Furber - All Rights Reserved.
Unauthorized copying of this repo, via any medium is strictly prohibited.
Proprietary and confidential.
Written by Ben Furber <ben@fu.rber.io>, September 2019.
