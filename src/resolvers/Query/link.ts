import { Context, fetchMetaData } from "../../utils";

export async function link(parent: any, { url }, ctx: Context) {
  return await fetchMetaData(url);
}
