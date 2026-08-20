"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export function RepeatableList({ name, label, initialItems = [], addLabel = "Add item", multiline = false }: { name: string; label: string; initialItems?: readonly string[]; addLabel?: string; multiline?: boolean }) {
  const [items, setItems] = useState<string[]>(initialItems.length ? [...initialItems] : [""]);
  return <fieldset><legend className="text-sm font-medium text-foreground/75">{label}</legend><input type="hidden" name={name} value={items.join("\n")} /><div className="mt-2 space-y-2">{items.map((item, index) => <div className="flex items-start gap-2" key={index}>{multiline ? <textarea value={item} rows={2} onChange={(e) => setItems(items.map((value, i) => i === index ? e.target.value : value))} className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm" /> : <input value={item} onChange={(e) => setItems(items.map((value, i) => i === index ? e.target.value : value))} className="min-h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm" />}<button type="button" onClick={() => setItems(items.filter((_, i) => i !== index))} className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-900/15 text-red-900" aria-label={`Delete ${label.toLowerCase()} item ${index + 1}`}><Trash2 className="size-4" /></button></div>)}</div><button type="button" onClick={() => setItems([...items, ""])} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm"><Plus className="size-4" />{addLabel}</button></fieldset>;
}
