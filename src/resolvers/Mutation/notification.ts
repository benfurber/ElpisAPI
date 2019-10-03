import { Context } from "../../utils";

export const notification = {
  async createNotification(parent, args, ctx: Context, info) {
    const { postId, replyId, userId } = args;

    const notification = await ctx.prisma.createNotification({
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
      reply: { connect: { id: replyId } },
      newNotification: true,
      type: replyId ? "comment" : "post"
    });
    return notification;
  },

  async ageNotification(parent, { id }, ctx: Context, info) {
    const agedNotification = await ctx.prisma.updateNotification({
      where: { id },
      data: { newNotification: false }
    });

    if (!agedNotification) {
      throw new Error(`No notification found: ${id}`);
    }

    return agedNotification;
  }
};
