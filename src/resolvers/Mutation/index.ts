import { auth } from './auth';
import { comment } from './comment';
import { notification } from './notification';
import { post } from './post';
import { reply } from './reply';
import { user } from './user';

export const Mutation = {
  ...auth,
  ...comment,
  ...notification,
  ...post,
  ...reply,
  ...user
};
