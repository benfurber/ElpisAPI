import { dateNow, getUserId, Context } from "../../utils";

const commentDoesNotExistLabel = `Comment not found or you're not the author`;

export const comment = {
  async createComment(parent, args, ctx: Context, info) {
    const { content, id, title } = args;
    const userId = getUserId(ctx);

    const author = { connect: { id: userId } };
    const discussionLevel = args.discussionLevel || 0;
    const post = { connect: { id } };
    const publishedAt = args.publishedAt || dateNow();

    const comment = await ctx.prisma.createComment({
      author,
      content,
      discussionLevel,
      post,
      publishedAt,
      title
    });
    return comment;
  },

  async deleteComment(parent, args, ctx: Context, info) {
    const { id } = args;

    if (!doesCommentExist(args, ctx)) {
      throw new Error(commentDoesNotExistLabel);
    }

    await ctx.prisma.deleteManyReplies({ comment: { id } });

    const deletedComment = await ctx.prisma.deleteComment({ id });
    return deletedComment;
  },

  async updateComment(parent, args, ctx: Context, info) {
    if (!doesCommentExist(args, ctx)) {
      throw new Error(commentDoesNotExistLabel);
    }

    const { content, discussionLevel, id, title } = args;

    const updatedComment = await ctx.prisma.updateComment({
      data: {
        content,
        discussionLevel,
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
