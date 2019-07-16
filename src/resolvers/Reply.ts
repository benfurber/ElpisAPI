import { Context } from "../utils";

export const Reply = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.reply({ id }).author();
  }
};
