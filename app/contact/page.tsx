import type { Metadata } from "next";
import { faqs, site } from "@/lib/data";
import { Shell, Section, Eyebrow, RoomTitle } from "@/components/section";
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
    "Write to June's Studio about a work, a commission, framing or shipping. Answers to the questions asked most often.",
};

export default function ContactPage() {
  return (
    <div className="pt-40 sm:pt-52">
      <Shell wide>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Eyebrow data-lift="0">Correspondence</Eyebrow>
            <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
              Write to the studio
            </h1>
            <p className="u-body u-measure mt-8" data-lift="2">
              Questions about a work, a commission, framing or shipping come
              directly to June, and are answered in the order they arrive.
            </p>

            <dl className="mt-14 space-y-8" data-lift="3">
              <div>
                <dt className="u-label">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="u-micro link-hair !text-chalk"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="u-label">Elsewhere</dt>
                <dd className="mt-2 flex gap-6">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="u-micro link-hair !text-chalk"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    className="u-micro link-hair !text-chalk"
                  >
                    Pinterest
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-lift="0">
            <ContactForm />
          </div>
        </div>
      </Shell>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <RoomTitle eyebrow="Questions" title="Asked often" />
          <div data-lift="0">
            <Accordion type="single" collapsible className="border-t border-chalk/10">
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
