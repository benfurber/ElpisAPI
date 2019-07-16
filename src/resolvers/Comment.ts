import { Context } from "../utils";

export const Comment = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.comment({ id }).author();
  },
  replies: ({ id }, args, ctx: Context) => {
    return ctx.prisma.replies({ where: { comment: { id } } });
  }
};
