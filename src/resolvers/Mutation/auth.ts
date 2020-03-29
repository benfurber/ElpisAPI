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

  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.createUser({ ...args, password });

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
