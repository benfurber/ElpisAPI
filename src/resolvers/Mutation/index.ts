import { auth } from "./auth";
import { comment } from "./comment";
import { community } from "./community";
import { notification } from "./notification";
import { post } from "./post";
import { reply } from "./reply";
import { user } from "./user";

const Mutation = {
  ...auth,
  ...comment,
  ...community,
  ...notification,
  ...post,
  ...reply,
  ...user
};

export { Mutation };
