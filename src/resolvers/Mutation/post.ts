import { getUserId, Context } from "../../utils";
import { notification } from "./notification";

export const post = {
  async createPost(parent, args, ctx: Context, info) {
    const { title, content, imagePath, published } = args;

    const userId = getUserId(ctx);
    return ctx.prisma.createPost({
      title,
      content,
      imagePath,
      published: published || true,
      author: {
        connect: { id: userId }
      }
    });
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
