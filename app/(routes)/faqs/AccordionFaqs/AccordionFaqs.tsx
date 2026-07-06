import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dataFaqs } from "./AccordionFaqs.data";

export default function AccordionFaqs() {
  return (
    <div>
      <Accordion defaultValue={["item-1"]}>
        {dataFaqs.map(({ id, question, answer }) => (
          <AccordionItem key={id} value={question}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
