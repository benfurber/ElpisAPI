import { getUserId, Context } from "../../utils";

export const comment = {
  async createComment(parent, { content, title, id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const comment = await ctx.prisma.createComment({
      author: {
        connect: { id: userId }
      },
      content,
      post: { connect: { id } },
      title
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
