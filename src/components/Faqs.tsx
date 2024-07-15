import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { DATA_TIENDA } from "@/constants/const";

export default function Faqs(): JSX.Element {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
              Encuentra respuestas a las preguntas más comunes sobre nuestros
              servicios.
            </p>
          </div>
          <Accordion type="single" collapsible>
            {DATA_TIENDA.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`question-${index}`}>
                <AccordionTrigger className="text-xl  font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-4 text-muted-foreground text-lg">
                    <p>{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
