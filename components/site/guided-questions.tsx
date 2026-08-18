"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  GUIDED_QUESTIONS,
  toggleAnswer,
  type GuidedAnswers,
} from "@/lib/guided-questions";

type Props = {
  answers: GuidedAnswers;
  onChange: (answers: GuidedAnswers) => void;
};

/**
 * Three short questions ahead of the contact form — a visitor sketches
 * their situation in a few taps instead of facing a blank textarea first.
 * Renders as selectable pills: toggleable (multi) for the focus question,
 * single-select for the other two. Purely local state, lifted to Contact
 * so it can build the summary line shown above the message field.
 */
export function GuidedQuestions({ answers, onChange }: Props) {
  const t = useTranslations("contact.guided");

  return (
    <div className="space-y-8">
      {GUIDED_QUESTIONS.map((question) => {
        const selected = answers[question.id] ?? [];
        return (
          <fieldset key={question.id}>
            <legend className="text-[0.95rem] font-medium text-foreground/85">
              {t(`${question.id}.question`)}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {question.options.map((option) => {
                const isSelected = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      onChange(toggleAnswer(answers, question, option.id))
                    }
                    className={cn(
                      "min-h-11 rounded-full border px-4 py-2.5 text-left text-[0.9rem] leading-snug transition-colors",
                      isSelected
                        ? "border-[var(--plum)] bg-[var(--plum)] text-[var(--primary-foreground)]"
                        : "border-foreground/15 bg-background text-foreground/75 hover:border-[var(--clay)]/60 hover:text-foreground"
                    )}
                  >
                    {t(`${question.id}.options.${option.id}`)}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
