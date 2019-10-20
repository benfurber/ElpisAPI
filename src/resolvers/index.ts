import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { auth } from "./Mutation/auth";
import { comment } from "./Mutation/comment";
import { link } from "./Mutation/link";
import { notification } from "./Mutation/notification";
import { post } from "./Mutation/post";
import { reply } from "./Mutation/reply";
import { user } from "./Mutation/user";
import { Comment } from "./Comment";
import { Notification } from "./Notification";
import { User } from "./User";
import { Post } from "./Post";
import { Reply } from "./Reply";

export default {
  Query,
  Mutation: {
    ...auth,
    ...comment,
    ...link,
    ...notification,
    ...post,
    ...reply,
    ...user
  },
  Subscription,
  Comment,
  Notification,
  Post,
  Reply,
  User
};
