import { Context, getUserId } from "../utils";

export const Comment = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.comment({ id }).author();
  },
  isAuthorCurrentUser: async ({ id }, args, ctx: Context) => {
    const userId = getUserId(ctx);
    const author = await ctx.prisma.comment({ id }).author();

    return userId === author.id;
  },
  post: ({ id }, args, ctx: Context) => {
    return ctx.prisma.comment({ id }).post();
  },
  replies: ({ id }, args, ctx: Context) => {
    return ctx.prisma.replies({ where: { comment: { id } } });
  },
  totalReplies: async ({ id }, args, ctx: Context) => {
    return ctx.prisma.replies({ where: { comment: { id } } }).then(response => {
      return response.length;
    });
  }
};
