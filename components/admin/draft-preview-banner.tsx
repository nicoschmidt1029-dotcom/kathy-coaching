import Link from "next/link";

export function DraftPreviewBanner({ backHref }: { backHref: string }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex min-h-12 items-center justify-center gap-4 bg-[#173f3b] px-4 py-2 text-center text-sm text-white shadow-lg">
      <span>Private draft preview — only signed-in administrators can see this version.</span>
      <Link href={backHref} className="shrink-0 font-semibold underline underline-offset-4">
        Back to Admin
      </Link>
    </div>
  );
}
