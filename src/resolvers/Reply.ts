import { Context, getUserId } from "../utils";

export const Reply = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).author();
  },
  comment: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).comment();
  },
  link: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).link();
  },
  isAuthorCurrentUser: async ({ id }, args, ctx: Context) => {
    const userId = getUserId(ctx);

    const author = await ctx.prisma.reply({ id }).author();
    return userId === author.id;
  }
};
