import { Context, dateNow, getUserId, findUrlInContent } from "../../utils";

import { notification } from "./notification";

export const reply = {
  async createReply(parent, args, ctx: Context, info) {
    const { id, imagePath, content } = args;

    const userId = getUserId(ctx);
    const author = { connect: { id: userId } };
    const comment = { connect: { id } };
    const link = findUrlInContent(content) || null;

    const publishedAt = args.publishedAt || dateNow();

    const reply = await ctx.prisma.createReply({
      author,
      comment,
      content,
      imagePath,
      link,
      publishedAt
    });

    await createNotification({ reply, id }, ctx);
    return reply;
  },

  async deleteReply(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const replyExists = await ctx.prisma.$exists.reply({
      id,
      author: { id: userId }
    });
    if (!replyExists) {
      throw new Error(`Reply not found or you're not the author`);
    }

    return ctx.prisma.deleteReply({ id });
  }
};

async function createNotification({ reply, id }, ctx) {
  const postId = await ctx.prisma
    .comment({ id })
    .post()
    .id();
  const commentAuthor = await ctx.prisma
    .comment({ id })
    .author()
    .id();
  return await notification.createNotification(
    null,
    { postId, replyId: reply.id, userId: commentAuthor },
    ctx,
    null
  );
}
