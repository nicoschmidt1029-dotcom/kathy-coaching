/**
 * Contact page — guided question flow.
 *
 * Shown before the contact form so a visitor sketches their situation in a
 * few taps instead of facing a blank textarea first. Deliberately a plain
 * data structure (not JSX) so the questions/options can be reworded or
 * reordered without touching the component that renders them — Katarina is
 * expected to want to tune the wording once she sees it live.
 *
 * Each question's `id` is also its translation-key prefix under
 * `contact.guided.<id>` in messages/*.json (`.question`, then
 * `.options.<optionId>` for each option).
 *
 * `multi: true` renders toggleable pills (any number selectable, incl.
 * zero); `multi: false` renders a single-select group.
 */
export type GuidedOption = {
  id: string;
};

export type GuidedQuestion = {
  id: string;
  multi: boolean;
  options: GuidedOption[];
};

export const GUIDED_QUESTIONS: GuidedQuestion[] = [
  {
    id: "focus",
    multi: true,
    options: [
      { id: "movement" },
      { id: "nutrition" },
      { id: "mindset" },
      { id: "faith" },
      { id: "multiple" },
    ],
  },
  {
    id: "goal",
    multi: false,
    options: [
      { id: "energy" },
      { id: "confidence" },
      { id: "routine" },
      { id: "peace" },
      { id: "unsure" },
    ],
  },
  {
    id: "support",
    multi: false,
    options: [
      { id: "close" },
      { id: "flexible" },
      { id: "mix" },
      { id: "unsure" },
    ],
  },
];

/** Selected option ids per question id, e.g. `{ focus: ["nutrition", "mindset"] }`. */
export type GuidedAnswers = Record<string, string[]>;

/**
 * Builds the "Du möchtest Unterstützung bei: X + Y" summary line from the
 * first (focus) question's selections — the one visible above the message
 * field once a visitor reaches the form. `t` is a next-intl translator
 * scoped to `contact.guided`, e.g. `useTranslations("contact.guided")`.
 * Returns `undefined` when nothing is selected yet, so callers can hide the
 * line entirely rather than show an empty sentence.
 */
export function buildGuidedSummary(
  answers: GuidedAnswers,
  t: (key: string) => string
): string | undefined {
  const focus = answers.focus ?? [];
  if (focus.length === 0) return undefined;
  const labels = focus.map((id) => t(`focus.options.${id}`));
  return labels.join(" + ");
}

export function toggleAnswer(
  answers: GuidedAnswers,
  question: GuidedQuestion,
  optionId: string
): GuidedAnswers {
  const current = answers[question.id] ?? [];
  if (question.multi) {
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    return { ...answers, [question.id]: next };
  }
  // single-select: clicking the already-selected option clears it
  const next = current[0] === optionId ? [] : [optionId];
  return { ...answers, [question.id]: next };
}
