import Image from "next/image";
import { panelClass } from "@/components/admin/fields";
import { createClient } from "@/lib/supabase/server";
import { deleteMedia } from "@/app/admin/actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";

export default async function MediaPage() {
  const supabase = await createClient();
  const folders = ["recipes", "programs", "website"];
  const files = (await Promise.all(folders.map(async (folder) => {
    const { data } = await supabase.storage.from("site-media").list(folder, { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    return (data ?? []).map((file) => ({ ...file, folder }));
  }))).flat();
  return <><p className="eyebrow">Uploads</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Media</h1><p className="mt-3 text-sm text-foreground/55">Images uploaded through Programs, Recipes and Website Content. Delete only files that are no longer used.</p>{files.length ? <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{files.map((file) => { const path = `${file.folder}/${file.name}`; const url = supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl; return <div key={path} className={`${panelClass} p-3`}><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={url} alt={file.name} fill className="object-cover" /></div><p className="mt-3 truncate text-xs text-foreground/55">{file.name}</p><form action={deleteMedia} className="mt-3"><input type="hidden" name="path" value={path} /><ConfirmSubmit message="Delete this uploaded image? Make sure it is no longer used on the website.">Delete image</ConfirmSubmit></form></div>; })}</div> : <div className={`${panelClass} mt-7 text-sm text-foreground/55`}>No uploaded images yet. Images appear here automatically after the first upload.</div>}</>;
}
