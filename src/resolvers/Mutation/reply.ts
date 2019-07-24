import { getUserId, Context } from "../../utils";

export const reply = {
  async createReply(parent, { content, comment }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createReply({
      content,
      author: {
        connect: { id: userId }
      },
      comment
    });
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
