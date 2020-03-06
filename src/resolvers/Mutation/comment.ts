import { dateNow, getUserId, Context } from "../../utils";

const commentDoesNotExistLabel = `Comment not found or you're not the author`;

export const comment = {
  async createComment(parent, args, ctx: Context, info) {
    const { content, id, title } = args;

    const publishedAt = args.publishedAt || dateNow();

    const userId = getUserId(ctx);
    const comment = await ctx.prisma.createComment({
      author: {
        connect: { id: userId }
      },
      content,
      post: { connect: { id } },
      publishedAt,
      title
    });
    return comment;
  },

  async deleteComment(parent, args, ctx: Context, info) {
    if (!doesCommentExist(args, ctx)) {
      throw new Error(commentDoesNotExistLabel);
    }

    const deletedComment = await ctx.prisma.deleteComment({ id: args.id });
    return deletedComment;
  },

  async updateComment(parent, args, ctx: Context, info) {
    if (!doesCommentExist(args, ctx)) {
      throw new Error(commentDoesNotExistLabel);
    }

    const { content, id, title } = args;

    const updatedComment = await ctx.prisma.updateComment({
      data: {
        content,
        edited: true,
        title
      },
      where: { id }
    });
    return updatedComment;
  }
};

async function doesCommentExist(args, ctx: Context) {
  const userId = getUserId(ctx);
  const commentExists = await ctx.prisma.$exists.comment({
    id: args.id,
    author: { id: userId }
  });

  return commentExists;
}
