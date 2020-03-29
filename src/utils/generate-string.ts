import * as crypto from "crypto";

function generateString() {
  return crypto.randomBytes(20).toString("hex");
}

export { generateString };
