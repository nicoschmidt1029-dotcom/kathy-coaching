import "server-only";

import { cookies } from "next/headers";

const PREFIX = "katey_admin_preview_";
const CHUNK_SIZE = 3000;
const MAX_CHUNKS = 12;

export type AdminPreviewRecord = {
  content_type: "website" | "program" | "recipe";
  content_key: string;
  status: "draft";
  sort_order: number;
  image_path: string | null;
  data: Record<string, unknown>;
};

function cookieName(contentType: string, contentKey: string, index: number) {
  return `${PREFIX}${contentType}_${contentKey}_${index}`.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export async function saveAdminPreview(record: AdminPreviewRecord) {
  const jar = await cookies();
  const encoded = Buffer.from(JSON.stringify(record), "utf8").toString("base64url");
  const chunks = Array.from({ length: Math.ceil(encoded.length / CHUNK_SIZE) }, (_, index) => encoded.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE));
  if (chunks.length > MAX_CHUNKS) throw new Error("This preview is too large. Shorten the content or save it as a draft first.");
  for (let index = 0; index < MAX_CHUNKS; index += 1) {
    jar.set(cookieName(record.content_type, record.content_key, index), chunks[index] ?? "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: chunks[index] ? 600 : 0,
    });
  }
}

export async function readAdminPreview(contentType: string, contentKey: string) {
  const jar = await cookies();
  let encoded = "";
  for (let index = 0; index < MAX_CHUNKS; index += 1) {
    const chunk = jar.get(cookieName(contentType, contentKey, index))?.value;
    if (!chunk) break;
    encoded += chunk;
  }
  if (!encoded) return null;
  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminPreviewRecord;
  } catch {
    return null;
  }
}
