import { Context, getUserId } from "../../utils";

export function me(parent: any, args: any, ctx: Context) {
  const id = getUserId(ctx);
  return ctx.prisma.user({ id });
}
