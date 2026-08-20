import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedRecipe } from "@/lib/recipes";

export function RecipeCard({
  recipe,
  categoryLabel,
  viewRecipe,
}: {
  recipe: LocalizedRecipe;
  categoryLabel: string;
  viewRecipe: string;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="flex h-full flex-col focus-visible:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)]">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <p className="caption text-[var(--plum)]">
            {categoryLabel}
            <span className="px-2 text-[var(--clay)]">·</span>
            {recipe.totalTime}
          </p>
          <h3 className="mt-2 font-display text-[1.55rem] leading-tight text-foreground sm:text-[1.65rem]">
            {recipe.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-[0.92rem] leading-relaxed text-foreground/68">
            {recipe.shortDescription}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-[var(--plum)] underline-offset-4 group-hover:underline">
            {viewRecipe}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
