import { Context } from "../utils";

export const Conversation = {
  messages: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).messages();
  },
  participants: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).participants();
  },
};
