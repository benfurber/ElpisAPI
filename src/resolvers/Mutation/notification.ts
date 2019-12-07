import { Notification, PushNotification } from "../../models";
import { Context, notificationService } from "../../utils";

const notificationClass = new Notification();
const pushNotification = new PushNotification(notificationService);

export const notification = {
  async createNotification(parent, args, ctx: Context, info) {
    const { postId, replyId, userId } = args;

    const notification = await ctx.prisma.createNotification({
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
      reply: replyId && { connect: { id: replyId } },
      newNotification: true,
      type: replyId ? "comment" : "post"
    });

    pushNotification.create(ctx, {
      contentId: replyId ? replyId : postId,
      type: notification.type,
      userId
    });
    return notification;
  },

  async createNotifications(parent, args, ctx: Context, info) {
    const { postId } = args;

    const alreadyExist = await notificationClass.exists(postId, ctx);
    if (alreadyExist) {
      console.log(`Notifications already exist for post: ${postId}`);
    }

    const users = await ctx.prisma.users();
    const notifications = await notificationClass.perUser(
      users,
      args,
      ctx,
      notification.createNotification
    );

    if (!notifications) {
      throw new Error(`Notifications not created for post: ${postId}`);
    }

    return notifications;
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
