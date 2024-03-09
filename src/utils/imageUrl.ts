export const ImageUrl = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "")
    .replace(" ", "-");
};
