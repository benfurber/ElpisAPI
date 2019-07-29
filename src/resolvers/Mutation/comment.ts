import { getUserId, Context } from "../../utils";

export const comment = {
  async createComment(parent, { content, id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const comment = await ctx.prisma.createComment({
      content,
      author: {
        connect: { id: userId }
      },
      post: { connect: { id } }
    });
    return comment;
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
