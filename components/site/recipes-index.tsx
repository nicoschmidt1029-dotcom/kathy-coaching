import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPublicRecipes } from "@/lib/cms";
import { DisplayTitle } from "./display-title";

export async function RecipesIndex({ locale }: { locale: Locale }) {
  const [t, recipes] = await Promise.all([getTranslations({ locale, namespace: "recipes" }), getPublicRecipes(locale)]);
  return <section className="section-pad section-pad-top-tight"><div className="container-page"><div className="max-w-2xl"><p className="eyebrow">{t("eyebrow")}</p><DisplayTitle className="mt-3">{t("title")}</DisplayTitle><p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-foreground/72 sm:text-lg">{t("intro")}</p></div><div className="mt-10 space-y-10 md:mt-14">{recipes.map((recipe) => <article key={recipe.slug} className="grid items-center gap-7 border-t border-foreground/10 pt-8 md:grid-cols-12 md:gap-12"><Link href={`/recipes/${recipe.slug}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)] md:col-span-5"><Image src={recipe.image} alt={recipe.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></Link><div className="md:col-span-7"><p className="eyebrow">{t(`categories.${recipe.category}`)} · {recipe.totalTime}</p><h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] text-[var(--plum)]">{recipe.title}</h2><p className="mt-4 max-w-xl leading-relaxed text-foreground/70 sm:text-[1.02rem]">{recipe.shortDescription}</p><Link href={`/recipes/${recipe.slug}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--plum)] underline-offset-4 hover:underline">{t("viewRecipe")}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link></div></article>)}</div></div></section>;
}
