import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("__session", {
    path: "/",
  });
  return new Response(JSON.stringify({ url: "/admin" }), {
    status: 200,
  });
};
