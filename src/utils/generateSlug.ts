export function generateSlug(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0E00-\u0E7F-]/g, "") // ✅ เพิ่ม \u0E00-\u0E7F ให้รองรับภาษาไทย
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
