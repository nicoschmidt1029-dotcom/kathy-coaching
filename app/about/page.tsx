import type { Metadata } from "next";
import { About } from "@/components/site/about";
import { Mission } from "@/components/site/mission";
import { Approach } from "@/components/site/approach";
import { HomeFinalCta } from "@/components/site/home-final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Katie Gröflin — certified personal trainer and nutrition coach, offering faith-rooted holistic coaching for body, nutrition, and soul.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Approach />
      <Mission />
      <HomeFinalCta />
    </>
  );
}
