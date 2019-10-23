import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";

export interface Context {
  prisma: Prisma;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export async function notificationsExist(postId, ctx) {
  const notifications = await ctx.prisma.notifications({
    where: { post: { id: postId } }
  });
  return notifications.length > 0;
}

export async function fetchMetaData(url: string) {
  const metascraper = require("metascraper")([
    require("metascraper-author")(),
    require("metascraper-date")(),
    require("metascraper-description")(),
    require("metascraper-image")(),
    require("metascraper-publisher")(),
    require("metascraper-title")(),
    require("metascraper-url")()
  ]);

  const got = require("got");

  const { body: html } = await got(url);
  const metadata = await metascraper({ html, url });
  metadata.id = hashCode(metadata.url);

  return metadata;
}

export function findUrlInContent(content: string) {
  if (typeof content !== "string") {
    return false;
  }

  const words = content.split(" ");

  const url = words.find(word => validURL(word));
  return url;
}

function validURL(url: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return !!pattern.test(url);
}

function hashCode(string: string) {
  return Array.from(string).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
}
