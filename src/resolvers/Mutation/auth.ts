import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context, getUserId } from "../../utils";

export const auth = {
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

  async login(parent, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },

  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.createUser({ ...args, password });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
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
