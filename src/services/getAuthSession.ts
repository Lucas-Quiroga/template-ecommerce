import { app } from "@/firebase/server";
import { getAuth } from "firebase-admin/auth";
import { type AstroCookies } from "astro";
import { Auth, type DecodedIdToken, UserRecord } from "firebase-admin/auth";

const auth: Auth = getAuth(app);

export async function getAuthSession(
  cookies: AstroCookies
): Promise<DecodedIdToken | null> {
  const sessionCookie: string | undefined = cookies.get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedCookie: DecodedIdToken = await auth.verifySessionCookie(
      sessionCookie
    );
    const user: UserRecord = await auth.getUser(decodedCookie.uid);
    return user ? decodedCookie : null;
  } catch {
    return null;
  }
}
