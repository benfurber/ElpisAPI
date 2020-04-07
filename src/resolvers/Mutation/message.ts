import { Context, dateNow, getUserId, findUrlInContent } from "../../utils";

import { notification } from "./notification";

export const message = {
  async createMessage(parent, args, ctx: Context, info) {
    const { content, conversationId } = args;

    const userId = getUserId(ctx);
    const author = { connect: { id: userId } };
    const conversation = { connect: { id: conversationId } };
    const link = findUrlInContent(content) || null;

    const message = await ctx.prisma.createMessage({
      author,
      content,
      conversation,
    });

    // if (!replyingToSelf(userId, reply, ctx)) {
    //   await createNotification({ reply, id }, ctx);
    // }

    return message;
  },

  // async deleteReply(parent, { id }, ctx: Context, info) {
  //   if (!doesReplyExist({ id }, ctx)) {
  //     throw new Error(`Reply not found or you're not the author`);
  //   }
  //   const deletedReply = await ctx.prisma.deleteReply({ id });
  //   return deletedReply;
  // },

  // async updateReply(parent, args, ctx: Context, info) {
  //   if (!doesReplyExist(args, ctx)) {
  //     throw new Error(`Reply not found or you're not the author`);
  //   }

  //   const { content, id, imagePath } = args;
  //   const link = findUrlInContent(content) || null;

  //   const updatedReply = await ctx.prisma.updateReply({
  //     data: {
  //       content,
  //       edited: true,
  //       imagePath,
  //       link
  //     },
  //     where: { id }
  //   });
  //   return updatedReply;
  // }
};

async function doesReplyExist(args, ctx: Context) {
  const userId = getUserId(ctx);
  const replyExists = await ctx.prisma.$exists.reply({
    id: args.id,
    author: { id: userId },
  });

  return replyExists;
}

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

async function replyingToSelf(userId: string, reply, ctx: Context) {
  const commentAuthor = await ctx.prisma.reply({ id: reply.id }).author();
  return userId === commentAuthor.id;
}
