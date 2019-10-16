import { getUserId, Context } from "../../utils";
import { notification } from "./notification";

export const reply = {
  async createReply(parent, { content, id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const reply = await ctx.prisma.createReply({
      content,
      author: {
        connect: { id: userId }
      },
      comment: { connect: { id } }
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
