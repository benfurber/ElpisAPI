import { labels } from "../../labels";
import { NotificationDetails } from "../../types";
import { Context, notificationsExist, notificationService } from "../../utils";

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

    createPushNotification(ctx, {
      contentId: replyId ? replyId : postId,
      type: notification.type,
      userId
    });
    return notification;
  },

  async createNotifications(parent, args, ctx: Context, info) {
    const { postId } = args;

    const alreadyExist = await notificationsExist(postId, ctx);
    if (alreadyExist) {
      console.log(`Notifications already exist for post: ${postId}`);
    }

    const users = await ctx.prisma.users();
    const notifications = await notificationPerUser(
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

async function notificationPerUser(users, args, ctx, createNotification) {
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

async function createPushNotification(ctx, details) {
  const notification: NotificationDetails = await pushNotificationFactory(
    ctx,
    details
  );
  if (notification) {
    return notificationService.sendNotification(notification);
  }
}

const pushNotificationFactory = async (
  ctx: Context,
  details
): Promise<NotificationDetails> => {
  const { contentId, type, userId } = details;
  const { published, leftAComment } = labels.notifications;

  if (type === "comment") {
    const { content } = await ctx.prisma.reply({ id: contentId });
    const { name } = await ctx.prisma.reply({ id: contentId }).author();
    return pushNotificationFormat(content, `${name} ${leftAComment}`, userId);
  }

  const { title } = await ctx.prisma.post({ id: contentId });
  const { name } = await ctx.prisma.post({ id: contentId }).author();
  return pushNotificationFormat(title, `${name} ${published}`, userId);
};

function pushNotificationFormat(content, heading, userId): NotificationDetails {
  return {
    contents: {
      en: content
    },
    headings: {
      en: heading
    },
    users: [userId]
  };
}
