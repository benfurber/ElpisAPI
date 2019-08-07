import * as bcrypt from "bcryptjs";
import { Context, getUserId } from "../../utils";

export const user = {
  async completeUserOnboarding(parent, {}, ctx: Context) {
    const userId = getUserId(ctx);
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: { onboarded: true }
    });

    if (!updatedUser) {
      throw new Error(`No such user found for id: ${userId}`);
    }

    return updatedUser;
  },

  async linkUserProfilePicture(parent, { avatarPath }, ctx: Context) {
    const userId = getUserId(ctx);
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: { avatarPath }
    });

    if (!updatedUser) {
      throw new Error(`No such user found for id: ${userId}`);
    }

    return updatedUser;
  },

  async updatePassword(parent, { password }, ctx: Context) {
    const newPassword = await bcrypt.hash(password, 10);
    const userId = getUserId(ctx);

    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: { password: newPassword }
    });

    if (!updatedUser) {
      throw new Error(`No such user found for id: ${userId}`);
    }

    return updatedUser;
  }
};
