import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { ImageUrl } from "../../../utils/imageUrl";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title")?.toString();
  const token = cookies.get("sb-access-token")?.toString();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!id || !title) {
    return new Response("ID AND TITLE REQUIRED", { status: 400 });
  }

  const { data, error } = await supabase.from("projects").delete().eq("id", id);
  const { data: imageData, error: imageError } = await supabase.storage
    .from("projects")
    .remove([`public/${ImageUrl(title)}.webp`]);

  if (imageError) {
    return new Response(imageError.message, { status: 500 });
  }

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard/edit");
};
