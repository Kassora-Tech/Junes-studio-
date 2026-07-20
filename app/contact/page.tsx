import type { Metadata } from "next";
import { faqs, site } from "@/lib/data";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to June's Studio about originals, commissions, shipping or anything else. Frequently asked questions on framing, returns and timelines.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow>Correspondence</Eyebrow>
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              Write to the studio
            </h1>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite">
              Questions about an original, a commission, framing or shipping —
              all correspondence comes directly to June, and letters are
              answered in the order they arrive, usually within two working
              days.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <p>
                <span className="eyebrow block">Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block text-ink underline decoration-stone underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {site.email}
                </a>
              </p>
              <p>
                <span className="eyebrow block">Elsewhere</span>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-ink underline decoration-stone underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Instagram
                </a>
                <span className="mx-2 text-stone">·</span>
                <a
                  href={site.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-ink underline decoration-stone underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Pinterest
                </a>
              </p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      <Section tone="ivory" className="mt-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Asked often, answered honestly" />
          <div className="mt-12" data-reveal>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>
    </div>
  );
}
