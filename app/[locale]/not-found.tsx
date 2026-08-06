import { NotFoundContent } from "@/components/site/not-found-content";

/**
 * Boundary for notFound() thrown by a page in this segment (e.g. an invalid
 * locale caught in the layout). Unknown URLs are handled by the catch-all in
 * [...rest] — see the note in components/site/not-found-content.tsx.
 *
 * No `metadata` export on purpose: not-found.tsx cannot receive `params`, so
 * a static title would be stuck in one language. The layout's localized
 * default applies instead.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
