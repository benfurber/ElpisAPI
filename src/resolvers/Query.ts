import { getUserId, Context } from "../utils";
import { link } from "./Mutation/link";

export const Query = {
  feed(parent, args, ctx: Context) {
    const where = { published: true };
    const orderBy = "updatedAt_DESC";

    return ctx.prisma.posts({ orderBy, where });
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
    const where = { url };
    const links = await ctx.prisma.links({ where });

    if (links.length > 0) return links[0];

    const createdLink = await link.createLink({}, { url }, ctx, {});
    return createdLink;
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
  }
};
