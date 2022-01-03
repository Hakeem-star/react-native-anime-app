export function getHTMLText(htmlString?: string | null): string {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]+>/g, "");
}
