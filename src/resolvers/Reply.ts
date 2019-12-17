import { Context } from "../utils";

export const Reply = {

  author: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.reply({ id }).author();
  },

  comment: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.reply({ id }).comment();
  },

  link: ({ id }, args: any, ctx: Context) => {
    return ctx.prisma.reply({ id }).link();
  }
};
