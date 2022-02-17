// Resolvers define the technique for fetching the types defined in the
import { Resolvers } from "../generated/graphql";

// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
  Query: {
    user: async (_, args, context) => {
      const user = await context.prisma.user.findMany();

      return user;
    },
  },
  Mutation: {
    createUser: async (_, args, context) => {
      const user = await context.prisma.user.create({
        data: {
          name: args.data?.name,
          email: args.data?.email || "",
        },
      });
      return user;
    },
  },
};
