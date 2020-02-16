import { GraphQLServer } from "graphql-yoga";
require("./utils/dotenv");

import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});
server.start(() => {
  console.log(`Token: ${process.env.PRISMA_TOKEN}`);
  console.log(`Server is running on http://localhost:4000`);
});
