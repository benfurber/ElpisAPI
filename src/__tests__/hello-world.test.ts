function helloWorld() {
  return "Hello world";
}

describe("hello", () => {
  it("returns a string", () => {
    expect(helloWorld()).toBe("Hello world");
  });
});
