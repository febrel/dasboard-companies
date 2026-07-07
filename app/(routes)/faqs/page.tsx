import AccordionFaqs from "./AccordionFaqs/AccordionFaqs";

export default function PageFaqs() {
  return (
    <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-6">
      <div className="mb-5 space-y-4 text-muted-foreground">
        <p>
          Welcome to our Frequently Asked Questions (FAQ) section, specifically
          designed to provide you with quick and clear answers about the
          corporate dashboard we have developed with passion and dedication.
        </p>
        <p>
          On this page, you will find a compilation of the most common questions
          our users ask regarding the dashboard's features, functionality, and
          usage. From signing up to making the most of its advanced tools, we
          have gathered an exhaustive list of queries to ensure you have the
          best possible experience.
        </p>
        <p>
          Our team has worked hard to provide detailed, easy-to-understand
          answers so you can find the information you need quickly and
          effortlessly. If you cannot find the answer you are looking for,
          please do not hesitate to contact us. We are here to help you every
          step of the way.
        </p>
        <p>
          Explore our FAQs and discover how our dashboard can boost your
          company's efficiency and success.
        </p>
      </div>

      <AccordionFaqs />
    </div>
  );
}
