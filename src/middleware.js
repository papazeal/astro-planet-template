import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export const onRequest = clerkMiddleware(async (auth, context) => {
  const { userId } = auth();

  // not signed-in
  if (!userId && isProtectedRoute(context.request)) {
    return context.redirect("/login");
  }

  // signed-in but not in admin emails list
  const adminEmails = import.meta.env.ADMIN_EMAILS;
  if (adminEmails)
    if (userId && isProtectedRoute(context.request)) {
      const user = await context.locals.currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!(userEmail && adminEmails.split(",").includes(userEmail)))
        return context.redirect("/not-allow");
    }
});
