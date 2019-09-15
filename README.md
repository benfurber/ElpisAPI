* Elpis API

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
docker!
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

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

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

