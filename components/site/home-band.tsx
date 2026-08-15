import Image from "next/image";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

/**
 * A full-bleed photograph, and nothing else.
 *
 * The home page had no moment — it opened with the hero and then ran at one
 * level to the end, while /about builds to the mission statement. This is the
 * pause: it breaks the container, carries no copy, and asks for nothing.
 *
 * Deliberately without a headline over it. Every other section on the page is
 * making a point; one that simply looks is what makes the rest read as
 * chosen rather than filled.
 */
export function HomeBand() {
  const photo = TEMP_PHOTOS.homeBand;
  if (!photo) return null;

  return (
    <section
      aria-hidden
      className="photo-warm-wash relative left-1/2 aspect-[3/4] w-screen max-w-none -translate-x-1/2 overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]"
    >
      <Image
        src={photo.url}
        alt=""
        fill
        sizes="100vw"
        className="photo-warm-grade object-cover object-[50%_35%]"
      />
    </section>
  );
}
