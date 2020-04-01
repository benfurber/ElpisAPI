import { labels } from "../labels";
import { NotificationDetails } from "../types";
import { Context } from "../utils";

class PushNotification {
  service: {
    sendNotification;
  };

  constructor(service) {
    this.service = service;
  }

  async create(ctx: Context, details) {
    const notification: NotificationDetails = await this.factory(ctx, details);
    if (notification) {
      return this.service.sendNotification(notification);
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
        link: `reply/${contentId}`,
        userId
      });
    }

    const { title } = await ctx.prisma.post({ id: contentId });
    const { name } = await ctx.prisma.post({ id: contentId }).author();
    return this.format({
      content: title,
      heading: `${name} ${published}`,
      link: `post/${contentId}`,
      userId
    });
  }

  format({ content, heading, link, userId }): NotificationDetails {
    return {
      app_url: `elpis://notification/${link}`,
      contents: {
        en: content
      },
      headings: {
        en: heading
      },
      users: [userId]
    };
  }
}

export { PushNotification };
