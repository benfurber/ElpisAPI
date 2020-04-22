import {
  Context,
  conversationCreateByUserIds,
  conversationFindByUserIds,
  getUserId,
  fetchMetaData,
} from "../utils";

export const Query = {
  comment(parent, { id }, ctx: Context) {
    return ctx.prisma.comment({ id });
  },

  community(parent, { id }, ctx: Context) {
    return ctx.prisma.community({ id });
  },

  conversation(parent, { id }, ctx: Context) {
    return ctx.prisma.conversation({ id });
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx);

    const where = {
      published: false,
      author: {
        id,
      },
    };

    return ctx.prisma.posts({ where });
  },

  feed(parent, args, ctx: Context) {
    const where = { published: true };
    const orderBy = "updatedAt_DESC";
    const first = args.first || 10;
    const skip = args.skip || 0;

    return ctx.prisma.posts({ first, orderBy, skip, where });
  },

  async findConversation(parent, { userIds }, ctx: Context) {
    const conversation = await conversationFindByUserIds(userIds, ctx);

    if (!conversation) return await conversationCreateByUserIds(userIds, ctx);

    return conversation;
  },

  async link(parent, { url }, ctx: Context) {
    return await fetchMetaData(url);
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },

  message(parent, { id }, ctx: Context) {
    return ctx.prisma.message({ id });
  },

  async messageFeed(parent, args, ctx: Context) {
    const { before, conversationId, last } = args;
    const id = conversationId;

    const conversation = await ctx.prisma.conversation({ id });
    const messages = await ctx.prisma
      .conversation({ id })
      .messages({ before, last });
    return {
      ...conversation,
      messages,
    };
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id });
  },

  reply(parent, { id }, ctx: Context) {
    return ctx.prisma.reply({ id });
  },

  user(parent, { id }, ctx: Context) {
    return ctx.prisma.user({ id });
  },
};
