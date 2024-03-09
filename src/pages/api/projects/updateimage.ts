import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { ImageUrl } from "../../../utils/imageUrl";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const image = formData.get("image");
  const token = cookies.get("sb-access-token")?.toString();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!image || !title) {
    return new Response("Image is required", { status: 400 });
  }

  const { data, error } = await supabase.storage
    .from("projects")
    .update(`public/${ImageUrl(title)}.webp`, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard/edit");
};
