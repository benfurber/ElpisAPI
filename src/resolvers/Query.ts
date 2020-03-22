import { Context, getUserId, fetchMetaData } from "../utils";

export const Query = {
  comment(parent, { id }, ctx: Context) {
    return ctx.prisma.comment({ id });
  },

  community(parent, { id }, ctx: Context) {
    return ctx.prisma.community({ id });
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx);

    const where = {
      published: false,
      author: {
        id
      }
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

  async link(parent, { url }, ctx: Context) {
    return await fetchMetaData(url);
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id });
  },

  reply(parent, { id }, ctx: Context) {
    return ctx.prisma.reply({ id });
  },

  user(parent, { id }, ctx: Context) {
    return ctx.prisma.user({ id });
  }
};
