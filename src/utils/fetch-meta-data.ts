function hashCode(string: string) {
  return Array.from(string).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
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
