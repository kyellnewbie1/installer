import bcrypt from "bcryptjs";
import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(10).max(128)
});

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}