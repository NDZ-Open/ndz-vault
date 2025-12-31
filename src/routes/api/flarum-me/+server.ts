import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async ({ cookies, fetch, request }) => {
  // Get environment variables at runtime (not inlined at build time)
  const FORUM_URL = env.FLARUM_URL || env.FORUM_URL || "https://ndz.ng";
  
  const sessionCookie = cookies.get("flarum_session");

  if (!sessionCookie) {
    throw error(401, "Not authenticated");
  }

  try {
    // Forward ALL cookies from the browser request to Flarum
    // This is critical - server fetch needs explicit cookie header
    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(`${FORUM_URL}/api`, {
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
      },
      // Don't use credentials: 'include' in server-side fetch - it's ignored
    });

    if (!response.ok) {
      throw error(401, "Invalid session");
    }

    const data = await response.json();

    if (!data.data || !data.data.id) {
      throw error(401, "No user data");
    }

    return json({
      id: data.data.id,
      username: data.data.attributes.username,
      email: data.data.attributes.email,
      displayName: data.data.attributes.displayName,
      avatarUrl: data.data.attributes.avatarUrl,
    });
  } catch (err) {
    console.error("Flarum auth check failed:", err);
    throw error(401, "Authentication failed");
  }
};
