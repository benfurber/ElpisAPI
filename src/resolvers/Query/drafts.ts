import { Context, getUserId } from "../../utils";

export function drafts(parent: any, args: any, ctx: Context) {
  const id = getUserId(ctx);

  const where = {
    published: false,
    author: {
      id
    }
  };

  return ctx.prisma.posts({ where });
}