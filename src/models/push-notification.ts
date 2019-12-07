import { labels } from "../labels";
import { NotificationDetails } from "../types";
import { Context, notificationService } from "../utils";

class PushNotification {
  async create(ctx, details) {
    const notification: NotificationDetails = await this.factory(ctx, details);
    if (notification) {
      return notificationService.sendNotification(notification);
    }
  }

  async factory(ctx: Context, details): Promise<NotificationDetails> {
    const { contentId, type, userId } = details;
    const { published, leftAComment } = labels.notifications;

    if (type === "comment") {
      const { content } = await ctx.prisma.reply({ id: contentId });
      const { name } = await ctx.prisma.reply({ id: contentId }).author();
      const { id } = await ctx.prisma
        .reply({ id: contentId })
        .comment()
        .post();
      return this.format({
        content,
        heading: `${name} ${leftAComment}`,
        postId: id,
        userId
      });
    }

    const { title } = await ctx.prisma.post({ id: contentId });
    const { name } = await ctx.prisma.post({ id: contentId }).author();
    return this.format({
      content: title,
      heading: `${name} ${published}`,
      postId: contentId,
      userId
    });
  }

  format({ content, heading, postId, userId }): NotificationDetails {
    return {
      app_url: `elpis://notification/post/${postId}`,
      contents: {
        en: content
      },
      headings: {
        en: heading
      },
      users: [userId]
    };
  }

  async perUser(users, args, ctx, createNotification) {
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

export { PushNotification };
