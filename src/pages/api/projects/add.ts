import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { ImageUrl } from "../../../utils/imageUrl";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const url = formData.get("url")?.toString();
  const github = formData.get("github")?.toString();
  const image = formData.get("image");
  const technologies = formData.get("technologies")?.toString();
  const features = formData.get("features")?.toString();
  const token = cookies.get("sb-access-token")?.toString();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!title || !description || !url || !image || !technologies || !features || !github) {
    return new Response("All fields are required", { status: 400 });
  }

  const technologiesArray = technologies?.split(",").map((tech) => tech.trim());
  const featuresArray = features?.split(",").map((feature) => feature.trim());

  const { data: imageData, error: imageError } = await supabase.storage
    .from("projects")
    .upload(`public/${ImageUrl(title)}.webp`, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imageError) {
    return new Response(imageError.message, { status: 500 });
  }

  const { data, error } = await supabase.from("projects").insert({
    title,
    description,
    url,
    github,
    image:
      "https://kbybzghapqwzfazzteir.supabase.co/storage/v1/object/public/projects/" +
      imageData.path,
    technologies: technologiesArray,
    features: featuresArray,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};
