import { Context, getUserId, fetchMetaData } from "../utils";

export const Query = {
  feed(parent, args, ctx: Context) {
    const where = { published: true };
    const orderBy = "updatedAt_DESC";
    const first = args.first || 10;
    const skip = args.skip || 0;

    return ctx.prisma.posts({ first, orderBy, skip, where });
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

  comment(parent, { id }, ctx: Context) {
    return ctx.prisma.comment({ id });
  },

  async link(parent, { url }, ctx: Context) {
    return await fetchMetaData(url);
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id });
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },

  reply(parent, { id }, ctx: Context) {
    return ctx.prisma.reply({ id });
  },

  user(parent, { id }, ctx: Context) {
    return ctx.prisma.user({ id });
  }
};
