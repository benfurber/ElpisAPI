import { Context } from "../../utils";

export function feed(parent: any, args: any, ctx: Context) {
  const where = { published: true };
  const orderBy = "updatedAt_DESC";

  return ctx.prisma.posts({ orderBy, where });
}