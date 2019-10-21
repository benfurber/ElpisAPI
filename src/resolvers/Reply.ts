import { Context, fetchMetaData } from "../utils";

export const Reply = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).author();
  },
  comment: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).comment();
  },
  link: async ({ id }, args, ctx: Context) => {
    const link = await ctx.prisma.reply({ id }).link();
    return fetchMetaData(link);
  }
};
