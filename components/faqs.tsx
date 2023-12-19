// components/faqs.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

export async function FAQs({ faqs }: { faqs: FAQ[] }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq: FAQ) => {
        return (
          <Accordion type="single" collapsible key={faq.question}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
