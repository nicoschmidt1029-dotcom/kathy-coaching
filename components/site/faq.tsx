import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Do I have to be a believer to work with you?",
    a: "No. The spiritual mentoring is offered, never required. The Training Only and Training + Nutrition programs work for anyone, regardless of faith background. The Complete program is built for those specifically wanting that dimension included.",
  },
  {
    q: "Is this only for women?",
    a: "It's built with women in mind first — but men are openly welcome, especially in the training and nutrition programs. The Complete program works for anyone willing to be honest about all three areas.",
  },
  {
    q: "How does a program actually work?",
    a: "We start with a free, no-pressure conversation to make sure we're a good fit. After that, you receive your personalized plan, we meet weekly (online or in person), and you have me as a guide through the whole six weeks.",
  },
  {
    q: "Do I need a gym membership?",
    a: "Not for most programs. I design the training around what you have access to — home, gym, or somewhere in between. We can talk through this on the call.",
  },
  {
    q: "What if I haven't trained in years — or ever?",
    a: "That's most of who I work with. Everything is built around your starting point. No prerequisites, no judgment. The goal is sustainable progress, not punishment.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            Honest answers, before you commit.
          </h2>
          <p className="mt-5 text-pretty text-foreground/70 sm:text-[1.05rem] sm:leading-[1.7]">
            Still wondering something not listed here? Send it along when you
            reach out — that&rsquo;s what the first conversation is for.
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="border-t border-foreground/10">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-foreground/10"
              >
                <AccordionTrigger className="py-6 font-display text-lg font-normal text-foreground hover:no-underline sm:text-xl">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-[0.98rem] leading-[1.7] text-foreground/72">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
