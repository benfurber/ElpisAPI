import { Context } from ".";

async function conversationCreateByUserIds(userIds: string[], ctx: Context) {
  const participants = { connect: [] };
  userIds.map((id: string) => participants.connect.push({ id }));

  return await ctx.prisma.createConversation({
    participants,
  });
}

export { conversationCreateByUserIds };
