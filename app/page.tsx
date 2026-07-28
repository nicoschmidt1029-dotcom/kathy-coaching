import { Hero } from "@/components/site/hero";
import { ApproachTeaser } from "@/components/site/approach-teaser";
import { SpotlightTestimonial } from "@/components/site/spotlight-testimonial";
import { ProgramsTeaser } from "@/components/site/programs-teaser";
import { HomeFinalCta } from "@/components/site/home-final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ApproachTeaser />
      <SpotlightTestimonial />
      <ProgramsTeaser />
      <HomeFinalCta />
    </>
  );
}
