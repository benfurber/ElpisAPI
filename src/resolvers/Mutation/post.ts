import { dateNow, Context } from "../../utils";

import { notification } from "./notification";

export const post = {
  async createPost(parent, args, ctx: Context, info) {
    const { content, id, imagePath, title } = args;

    const author = { connect: { id } };
    const published = args.published || true;
    const publishedAt = args.publishedAt || dateNow();

    const post = await ctx.prisma.createPost({
      title,
      content,
      imagePath,
      published,
      publishedAt,
      author
    });

    if (published) {
      const postId = post.id;
      await notification.createNotifications(null, { postId }, ctx, null);
    }

    return post;
  },

  async publish(parent, { communityId, id }, ctx: Context, info) {
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: communityId }
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

  async deletePost(parent, { communityId, id }, ctx: Context, info) {
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: communityId }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.prisma.deletePost({ id });
  }
};
