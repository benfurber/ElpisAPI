import { Context } from "../utils";

class Notification {
  async exists(postId, ctx: Context) {
    const notifications = await ctx.prisma.notifications({
      where: { post: { id: postId } }
    });
    return notifications.length > 0;
  }

  async perUser(users, args, ctx: Context, createNotification: (...args: any) => {}) {
    const { postId, replyId } = args;

    return users.map(async user => {
      const userId = user.id;
      const notification = await createNotification(
        null,
        { userId, postId, replyId },
        ctx,
        null
      );

      return notification;
    });
  }
}

export { Notification };
