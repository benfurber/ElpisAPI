import * as getUrls from "get-urls";

export function findUrlInContent(content: string): string | false {
  if (typeof content !== "string") {
    return false;
  }

  const urls = Array.from(getUrls(content));

  if (urls.length === 0) {
    return false;
  }

  return urls[0];
}
