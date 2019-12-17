import { Context } from "../utils";

export const User = {

  posts: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.user({ id }).posts();
  },

  notifications: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.user({ id }).notifications({ orderBy: "createdAt_DESC" });
  },

  unreadNotifications: async ({ id }, args: any, ctx: Context) => {
    const total = await ctx.prisma
      .user({ id })
      .notifications({ where: { newNotification: true } });
    return total.length;
  }
};
