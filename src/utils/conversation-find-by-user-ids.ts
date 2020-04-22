import { Context } from ".";

async function conversationFindByUserIds(userIds: string[], ctx: Context) {
  const where = { AND: [] };
  userIds.map((id: string) => where.AND.push({ participants_some: { id } }));

  const conversations = await ctx.prisma.conversations({ where });

  if (!conversations || conversations.length === 0) {
    return null;
  }

  return conversations[0];
}

export { conversationFindByUserIds };
