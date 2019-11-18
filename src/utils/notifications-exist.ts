export async function notificationsExist(postId, ctx) {
  const notifications = await ctx.prisma.notifications({
    where: { post: { id: postId } }
  });
  return notifications.length > 0;
}
