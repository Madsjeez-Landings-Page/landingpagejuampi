import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "./admin-auth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}
