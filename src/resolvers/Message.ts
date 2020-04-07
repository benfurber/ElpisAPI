import { Context } from "../utils";

export const Message = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.message({ id }).author();
  },
};
