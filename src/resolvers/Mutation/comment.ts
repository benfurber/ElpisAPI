import { getUserId, Context } from "../../utils";

export const comment = {
  async createComment(parent, { content, post }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createComment({
      content,
      author: {
        connect: { id: userId }
      },
      post
    });
  },

  async deleteComment(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const commentExists = await ctx.prisma.$exists.comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) {
      throw new Error(`Comment not found or you're not the author`);
    }

    return ctx.prisma.deleteComment({ id });
  }
};
