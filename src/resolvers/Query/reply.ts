import { Context } from "../../utils";

export function reply(parent: any, { id }, ctx: Context) {
  return ctx.prisma.reply({ id });
}