import { Context } from "../utils";

export const User = {
  posts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).posts();
  },
  notifications: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).notifications({ orderBy: "createdAt_DESC" });
  }
};
