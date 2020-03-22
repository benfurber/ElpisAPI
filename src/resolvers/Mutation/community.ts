import { dateNow, getUserId, Context } from "../../utils";

const communityDoesNotExistLabel = `Community not found`;

export const community = {
  async createCommunity(parent, args, ctx: Context, info) {
    const { avatarPath, name } = args;

    const userId = getUserId(ctx);
    const admins = { connect: { id: userId } };
    const community = await ctx.prisma.createCommunity({
      admins,
      avatarPath,
      name
    });

    return community;
  },

  async updateCommunity(parent, args, ctx: Context, info) {
    if (!doesCommunityExist(args, ctx)) {
      throw new Error(communityDoesNotExistLabel);
    }

    const { avatarPath, id, name } = args;

    const updatedComment = await ctx.prisma.updateCommunity({
      data: {
        avatarPath,
        name
      },
      where: { id }
    });
    return updatedComment;
  }
};

async function doesCommunityExist({ id }, ctx: Context) {
  await ctx.prisma.$exists.community({ id });
}
