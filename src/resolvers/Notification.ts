import { Context } from "../utils";

export const Notification = {
  content: ({ id }, args, ctx: Context) => {
    const content = {
      post: ctx.prisma.notification({ id }).post(),
      reply: ctx.prisma.notification({ id }).reply(),
      type: ctx.prisma.notification({ id }).type()
    };
    return content;
  }
};
