import { Context } from "../../utils";

export function post(parent: any, { id }, ctx: Context) {
  return ctx.prisma.post({ id });
}
