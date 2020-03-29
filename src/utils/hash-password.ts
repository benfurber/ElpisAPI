import * as bcrypt from "bcryptjs";

async function hashPassword(string: string) {
  const password = await bcrypt.hash(string, 10);
  return password;
}

export { hashPassword };
