import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { auth } from "./Mutation/auth";
import { comment } from "./Mutation/comment";
import { post } from "./Mutation/post";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Reply } from "./Reply";

export default {
  Query,
  Mutation: {
    ...auth,
    ...comment,
    ...post
  },
  Subscription,
  User,
  Post,
  Comment,
  Reply
};
