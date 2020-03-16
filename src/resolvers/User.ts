import { Context } from "../utils";

export const User = {
  posts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).posts();
  },
  notifications: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).notifications({ orderBy: "createdAt_DESC" });
  },
  totalReplies: async ({ id }, args, ctx: Context) => {
    const replies = await ctx.prisma.replies({ where: { author: { id } } });
    return replies.length;
  },
  totalTopics: async ({ id }, args, ctx: Context) => {
    const comments = await ctx.prisma.comments({ where: { author: { id } } });
    return comments.length;
  },
  unreadNotifications: async ({ id }, args, ctx: Context) => {
    const total = await ctx.prisma
      .user({ id })
      .notifications({ where: { newNotification: true } });
    return total.length;
  }
};
