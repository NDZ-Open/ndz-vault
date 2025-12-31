import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const handle: Handle = async ({ event, resolve }) => {
  // Get environment variables at runtime (not inlined at build time)
  const FLARUM_URL = env.FLARUM_URL || "https://ndz.ng";

  // Check for cookie AND validate it with Flarum
  const sessionCookie = event.cookies.get("flarum_session");

  event.locals.user = null;

  if (sessionCookie) {
    try {
      // Validate the cookie by calling Flarum's API
      // This ensures the cookie is actually valid, not just present
      const cookieHeader = event.request.headers.get("cookie") || "";

      const response = await event.fetch(`${FLARUM_URL}/api`, {
        headers: {
          Cookie: cookieHeader,
          Accept: "application/json",
        },
      });

      // Only authenticate if Flarum confirms the session is valid
      if (response.ok) {
        const data = await response.json();
        const userData = data.data;

        // STRICT validation: Only authenticate real users, not guests
        // Real authenticated users have:
        // - ID > 1 (guests are usually ID 1 or 0)
        // - Valid username (not empty, not "Guest")
        // - Email address (guests don't have emails)
        const username = userData?.attributes?.username?.trim() || "";
        const email = userData?.attributes?.email?.trim() || "";
        const userId = userData?.id;

        // Only authenticate if ALL conditions are met
        const isAuthenticated =
          userId &&
          typeof userId === "number" &&
          userId > 1 && // Exclude ID 1 (usually admin/guest)
          username !== "" &&
          username.toLowerCase() !== "guest" &&
          username.toLowerCase() !== "anonymous" &&
          email !== "" && // Real users have emails, guests don't
          email.includes("@"); // Basic email validation

        if (isAuthenticated) {
          event.locals.user = {
            authenticated: true,
          };
        }
      } else {
        // If Flarum API returns non-OK, cookie might be invalid
        // Don't redirect here - let the page handle it
        // This prevents infinite redirect loops
      }
    } catch (err) {
      // Validation failed - user stays null
      // Don't throw or redirect - just let the request continue
      // This prevents infinite redirect loops
    }
  }

  return resolve(event);
};
