import { Context } from "../utils";

export const Community = {
  admins: (parent, { id }, ctx: Context) => {
    return ctx.prisma.community({ id }).admins();
  },
  posts: (parent, { id }, ctx: Context) => {
    return ctx.prisma.posts({ where: { author: id } });
  }
};
