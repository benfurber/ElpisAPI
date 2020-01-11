import * as moment from "moment";

import { getUserId, Context } from "../../utils";
import { notification } from "./notification";

const dateNow = moment().format();

export const post = {
  async createPost(parent, args, ctx: Context, info) {
    const { title, content, imagePath } = args;
    const published = args.published || true;
    const publishedAt = args.publishedAt || dateNow;

    const userId = getUserId(ctx);
    const post = await ctx.prisma.createPost({
      title,
      content,
      imagePath,
      published,
      publishedAt,
      author: {
        connect: { id: userId }
      }
    });

    if (published) {
      const postId = post.id;
      await notification.createNotifications(null, { postId }, ctx, null);
    }

    return post;
  },

  async publish(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: userId }
    });

    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }
    const updatedPost = await ctx.prisma.updatePost({
      where: { id },
      data: { published: true }
    });

    await notification.createNotifications(null, { postId: id }, ctx, null);

    return updatedPost;
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.prisma.deletePost({ id });
  }
};
