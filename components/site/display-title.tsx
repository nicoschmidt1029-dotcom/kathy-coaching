import { cn } from "@/lib/utils";

type Props = {
  /** Full title. The first word is set hollow, the rest solid. */
  children: string;
  className?: string;
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
export function DisplayTitle({ children, className }: Props) {
  const words = children.trim().split(" ");
  const [first, ...rest] = words;
  const hollow = words.length > 1;

  return (
    <h2 className={cn("display-title", className)}>
      <span className={hollow ? "display-hollow" : undefined}>{first}</span>
      {rest.length > 0 && ` ${rest.join(" ")}`}
    </h2>
  );
}
