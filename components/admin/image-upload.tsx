"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ImageUpload({ initialValue = "", folder, hint = "Recommended: a clear image at least 1200 px wide or high." }: { initialValue?: string; folder: string; hint?: string }) {
  const [url, setUrl] = useState(initialValue);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  function choose(next: File) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(next.type) || next.size > 10 * 1024 * 1024) { setMessage("Please choose a JPG, PNG, WebP or AVIF image smaller than 10 MB."); return; }
    if (preview) URL.revokeObjectURL(preview);
    setFile(next); setPreview(URL.createObjectURL(next)); setMessage("Check the preview, then select Upload image.");
  }
  async function upload() {
    if (!file) return;
    setUploading(true); setMessage("Uploading image…");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const supabase = createClient();
    const { error } = await supabase.storage.from("site-media").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) setMessage("The image could not be uploaded. Please try another JPG, PNG, WebP or AVIF file.");
    else { setUrl(supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl); setFile(null); setPreview(""); setMessage("Image uploaded. Save the form to use it on the website."); }
    setUploading(false);
  }
  const shown = preview || url;
  return <div><input type="hidden" name="image_path" value={url} /><p className="text-sm font-medium text-foreground/75">Image</p><p className="mt-1 text-xs text-foreground/50">{hint}</p>{shown && <div className="relative mt-2 aspect-[4/3] max-w-md overflow-hidden rounded-2xl bg-black/5"><Image src={shown} alt="New image preview" fill unoptimized={shown.startsWith("blob:") || shown.includes("supabase.co")} className="object-cover" /><button type="button" onClick={() => { setFile(null); setPreview(""); if (!preview) setUrl(""); }} className="absolute right-2 top-2 flex size-10 items-center justify-center rounded-full bg-white shadow" aria-label="Remove image"><X className="size-4" /></button></div>}<div className="mt-3 flex flex-wrap gap-2"><label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm"><ImagePlus className="size-4" />{url ? "Replace image" : "Choose image"}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploading} onChange={(event) => event.target.files?.[0] && choose(event.target.files[0])} /></label>{file && <button type="button" disabled={uploading} onClick={upload} className="min-h-11 rounded-xl bg-[var(--plum)] px-4 text-sm text-white disabled:opacity-60">{uploading ? "Uploading…" : "Upload image"}</button>}</div>{message && <p role="status" className="mt-2 text-xs text-foreground/60">{message}</p>}</div>;
}
