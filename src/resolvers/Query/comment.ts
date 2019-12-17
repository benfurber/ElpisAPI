import { Context } from "../../utils";

export function comment(parent: any, { id }, ctx: Context) {
  return ctx.prisma.comment({ id });
}