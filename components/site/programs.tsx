import { ProgramDetail } from "@/components/site/program-detail";
import type { Locale } from "@/i18n/routing";
import { getPublicPrograms } from "@/lib/cms";

export async function Programs({ locale }: { locale: Locale }) {
  const programs = await getPublicPrograms(locale);
  const program = programs[0];

  if (!program) return null;

  // With one real offer, the Programs route is the presentation itself—not
  // a catalogue containing a single product card. The data layer still
  // supports additional programs when Katarina is ready to publish them.
  return <ProgramDetail program={program} locale={locale} showBackLink={false} />;
}
