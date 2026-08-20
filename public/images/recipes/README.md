# Recipe photography

The recipe collection reads these stable 4:3 WebP assets from `lib/recipes.ts`:

- `mediterranean-chicken-bowl.webp`
- `berry-overnight-oats.webp`
- `lemon-salmon.webp`
- `green-mango-smoothie.webp`
- `sweet-potato-bowl.webp`
- `apple-protein-pancakes.webp`
- `hummus-veggie-wrap.webp`
- `yogurt-berry-crunch.webp`
- `date-almond-bites.webp`
- `yogurt-bark.webp`

The current set was generated specifically for Katey Coaching using one shared
editorial food-photography direction, then compressed to WebP. There are no
remote image dependencies or empty placeholders. Commissioned recipe photos can
replace these later without a code change: keep the same filename, 4:3 crop and
roughly 1536 × 1152 source size.

For a new recipe, add a new WebP here and reference its `/images/recipes/...`
path in the typed recipe object in `lib/recipes.ts`.
