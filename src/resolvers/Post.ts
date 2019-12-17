import { Context } from "../utils";

export const Post = {

  author: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.post({ id }).author();
  },

  comments: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.comments({ where: { post: { id } } });
  }

};
