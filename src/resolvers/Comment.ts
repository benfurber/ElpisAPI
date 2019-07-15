import { Context } from "../utils";

export const Comment = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.comment({ id }).author();
  }
};
