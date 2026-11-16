import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalise an image field that may be a plain URL string or a Cloudinary ImageAsset object,
 * with optional Cloudinary transformation params (e.g. "c_fill,w_400,h_500,q_auto,f_auto").
 */
export function imgUrl(
  value: string | { url?: string | null } | null | undefined,
  transform?: string,
): string | undefined {
  if (!value) return undefined;
  let url = typeof value === "string" ? value : (value.url ?? undefined);
  if (!url) return undefined;

  if (transform && url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Avoid double transformation if already present
    if (!url.includes(`/upload/${transform}/`)) {
      url = url.replace("/upload/", `/upload/${transform}/`);
    }
  }

  return url;
}
