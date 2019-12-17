import { Context } from "../../utils";

export const feedSubscription = {

  subscribe: async (parent: any, args: any, ctx: Context) => {
    return ctx.prisma.$subscribe
      .post({
        mutation_in: ['CREATED', 'UPDATED'],
      })
      .node()
  },

  resolve: (payload: any) => {
    return payload
  },
}
