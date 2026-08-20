import { cn } from "@/lib/utils";

type Props = {
  /** Full title. The first word is set hollow, the rest solid. */
  children: string;
  className?: string;
  /**
   * Set on a dark ground (the petrol mission band). The hollow word is stroked
   * in cream instead of clay — clay on petrol-deep is barely legible as an
   * outline, and an outline you cannot see is just a missing word.
   */
  onDark?: boolean;
  as?: "h1" | "h2";
};

/**
 * Section title set as a graphic element.
 *
 * The first word is hollow and the remainder solid, which is the move the
 * reference site uses to stop a large heading reading as a shout: the eye
 * gets an outline to enter through and lands on the filled words. One word
 * rather than a configurable split — a rule that needs deciding per section
 * gets decided inconsistently.
 *
 * Single-word titles are rendered solid; a lone hollow word is a logo, not
 * a heading.
 */
export function DisplayTitle({ children, className, onDark = false, as: Heading = "h2" }: Props) {
  const words = children.trim().split(" ");
  const [first, ...rest] = words;
  const hollow = words.length > 1;

  return (
    <Heading className={cn("display-title", className)}>
      <span
        className={
          hollow
            ? onDark
              ? "display-hollow-light"
              : "display-hollow"
            : undefined
        }
      >
        {first}
      </span>
      {rest.length > 0 && ` ${rest.join(" ")}`}
    </Heading>
  );
}
