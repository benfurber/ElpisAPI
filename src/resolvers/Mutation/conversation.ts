import { dateNow, getUserId, Context } from "../../utils";

const commentDoesNotExistLabel = `Comment not found or you're not the author`;

export const conversation = {
  async createConversation(parent, args, ctx: Context, info) {
    const { participantIds } = args;
    const userId = getUserId(ctx);

    const participants = {
      connect: [{ id: userId }],
    };
    participantIds.map((id: string) => participants.connect.push({ id }));

    const conversation = await ctx.prisma.createConversation({
      participants,
    });
    return conversation;
  },

  // async deleteComment(parent, args, ctx: Context, info) {
  //   const { id } = args;

  //   if (!doesCommentExist(args, ctx)) {
  //     throw new Error(commentDoesNotExistLabel);
  //   }

  //   await ctx.prisma.deleteManyReplies({ comment: { id } });

  //   const deletedComment = await ctx.prisma.deleteComment({ id });
  //   return deletedComment;
  // },

  // async updateComment(parent, args, ctx: Context, info) {
  //   if (!doesCommentExist(args, ctx)) {
  //     throw new Error(commentDoesNotExistLabel);
  //   }

  //   const { content, discussionLevel, id, title } = args;

  //   const updatedComment = await ctx.prisma.updateComment({
  //     data: {
  //       content,
  //       discussionLevel,
  //       edited: true,
  //       title,
  //     },
  //     where: { id },
  //   });
  //   return updatedComment;
  // },
};

async function doesCommentExist(args, ctx: Context) {
  const userId = getUserId(ctx);
  const commentExists = await ctx.prisma.$exists.comment({
    id: args.id,
    author: { id: userId },
  });

  return commentExists;
}
