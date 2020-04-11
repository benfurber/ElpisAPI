import { Context } from "../utils";

export const Subscription = {
  conversationSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      return await ctx.prisma.$subscribe.message({
        mutation_in: ["CREATED"],
        node: { conversation: { id: args.id } }
      });
    },
    resolve: payload => {
      return payload;
    }
  },
  feedSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .post({
          mutation_in: ["CREATED", "UPDATED"]
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
};
