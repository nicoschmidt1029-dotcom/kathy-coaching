import type { Metadata } from "next";
import { SpotlightTestimonial } from "@/components/site/spotlight-testimonial";
import { Testimonials } from "@/components/site/testimonials";
import { HomeFinalCta } from "@/components/site/home-final-cta";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about six weeks with Katarina — real names, real programs, what actually changed.",
};

export default function TestimonialsPage() {
  return (
    <>
      <SpotlightTestimonial />
      <Testimonials />
      <HomeFinalCta />
    </>
  );
}
