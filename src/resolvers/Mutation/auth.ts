import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {
  Context,
  emailService,
  generateString,
  hashPassword
} from "../../utils";

export const auth = {
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

  async resetPassword(parent, args, ctx: Context) {
    const { id, passwordRequest } = args;

    const user = await ctx.prisma.user({ id });
    if (!user || user.passwordRequest !== passwordRequest) {
      throw new Error(
        `Password not changed: No such user or password request token invalid`
      );
    }

    const password = await hashPassword(args.password);
    await ctx.prisma.updateUser({
      data: { password, passwordRequest: null },
      where: { id }
    });

    return await auth.login(
      parent,
      {
        email: user.email,
        password: args.password
      },
      ctx
    );
  },

  async signup(parent, args, ctx: Context) {
    const email = args.email.toLowerCase();
    const password = await hashPassword(args.password);
    const user = await ctx.prisma.createUser({ ...args, email, password });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },

  async requestPasswordReset(parent, args, ctx: Context) {
    const email = args.email.toLowerCase();

    let user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const passwordRequest = generateString();

    user = await ctx.prisma.updateUser({
      data: { passwordRequest },
      where: { id: user.id }
    });

    await emailService.sendPasswordReset(user);

    return user;
  }
};
