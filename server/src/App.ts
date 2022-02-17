import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { ContextFunction } from "apollo-server-core";
import { typeDefs } from "./typeDefs/schema";
import { Context } from "../types";

const prisma = new PrismaClient();

export const context: ContextFunction<Context> = (args) => {
  return { ...args, prisma };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
