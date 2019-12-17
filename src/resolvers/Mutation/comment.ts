import { getUserId, Context } from "../../utils";

export const comment = {

  async createComment(parent: any, { content, id }, ctx: Context, info: any) {
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

  async deleteComment(parent: any, { id }, ctx: Context, info: any) {
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
