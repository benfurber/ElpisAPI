import { findUrlInContent } from "../find-url-in-content";

describe("findUrlInContent", () => {
  describe("finds a url in a string", () => {
    it("when it's the whole string", () => {
      const url = "https://bbc.co.uk";
      expect(findUrlInContent(url)).toEqual(url);
    });

    it("when it's in the middle of a string", () => {
      const url = "https://bbc.co.uk";

      const string = `Words before ${url} and words after`;

      expect(findUrlInContent(string)).toEqual(url);
    });

    it("when there's a full stop just after the url", () => {
      const url = "https://bbc.co.uk";

      const string = `Link at the end of a sentence ${url}.`;

      expect(findUrlInContent(string)).toEqual(url);
    });
  });

  it("returns false when there isn't a URL present", () => {
    const noUrl = "Just a boring string";
    expect(findUrlInContent(noUrl)).toEqual(false);
  });
});
