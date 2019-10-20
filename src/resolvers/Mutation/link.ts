import { Context, fetchMetaData } from "../../utils";

export const link = {
  async createLink(parent, { url }, ctx: Context, info) {
    const data = await fetchMetaData(url);
    const link = await ctx.prisma.createLink(data);

    return link;
  }
};
