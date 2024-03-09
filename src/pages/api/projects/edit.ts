import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const id = formData.get("id")?.toString();
  const description = formData.get("description")?.toString();
  const url = formData.get("url")?.toString();
  const github = formData.get("github")?.toString();
  const technologies = formData.get("technologies")?.toString();
  const features = formData.get("features")?.toString();
  const token = cookies.get("sb-access-token")?.toString();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!title || !description || !url || !technologies || !features || !github) {
    return new Response("All fields are required", { status: 400 });
  }

  const technologiesArray = technologies?.split(",").map((tech) => tech.trim());
  const featuresArray = features?.split(",").map((feature) => feature.trim());

  const { data, error } = await supabase
    .from("projects")
    .update({
      title,
      description,
      url,
      github,
      technologies: technologiesArray,
      features: featuresArray,
    })
    .eq("id", id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard/edit");
};
