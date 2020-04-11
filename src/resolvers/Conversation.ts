import { Context, getUserId } from "../utils";

export const Conversation = {
  messages: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).messages();
  },
  remainingParticipants: async ({ id }, args, ctx: Context) => {
    const currentUserId = getUserId(ctx);
    const allParticipants = await ctx.prisma
      .conversation({ id })
      .participants();

    return allParticipants.filter(
      (participant) => participant.id !== currentUserId
    );
  },
  participants: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).participants();
  },
};
