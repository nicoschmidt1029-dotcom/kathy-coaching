"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ImageUpload({ initialValue = "", folder }: { initialValue?: string; folder: string }) {
  const [url, setUrl] = useState(initialValue);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
      setMessage("Bitte JPG, PNG, WebP oder AVIF bis maximal 10 MB wählen.");
      return;
    }
    setUploading(true);
    setMessage("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const supabase = createClient();
    const { error } = await supabase.storage.from("site-media").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) setMessage(error.message);
    else {
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setUrl(data.publicUrl);
      setMessage("Bild hochgeladen.");
    }
    setUploading(false);
  }

  return <div>
    <input type="hidden" name="image_path" value={url} />
    <p className="text-sm font-medium text-foreground/75">Image</p>
    {url ? <div className="relative mt-2 aspect-[4/3] max-w-md overflow-hidden rounded-2xl bg-black/5"><Image src={url} alt="Upload preview" fill unoptimized={url.includes("supabase.co")} className="object-cover" /><button type="button" onClick={() => setUrl("")} className="absolute right-2 top-2 rounded-full bg-white p-2 shadow" aria-label="Remove image"><X className="size-4" /></button></div> : null}
    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm hover:border-[var(--clay)]"><ImagePlus className="size-4" />{uploading ? "Uploading…" : "Choose image"}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploading} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} /></label>
    {message && <p className="mt-2 text-xs text-foreground/60">{message}</p>}
  </div>;
}
