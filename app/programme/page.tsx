import type { Metadata } from "next";
import { Programs } from "@/components/site/programs";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three six-week programs, one-on-one. Training only, training + nutrition, or the complete path with faith mentoring. Value-honest pricing.",
};

export default function ProgrammePage() {
  return (
    <>
      <Programs />
      <Faq />
    </>
  );
}
