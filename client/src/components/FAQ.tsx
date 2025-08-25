import {useState} from 'react';
import {ChevronDown, HelpCircle} from 'lucide-react';
import {Card, CardContent} from './ui/card';
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from './ui/collapsible';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: 'How do I register for competitions?',
      answer: 'Registration is simple! Click the login button on any the navbar, log in to your existing account or create a new one, then navigate to the Competitions section and select the competition you want to enter. Fill out the registration form and submit it before the deadline.'
    },
    {
      question: 'What are the eligibility requirements?',
      answer: 'Participants must be currently enrolled university students with a valid student ID.'
    },
    {
      question: 'Can I participate in multiple competitions?',
      answer: "Absolutely! You can register for as many competitions as you'd like, as long as the schedules don't conflict. We encourage students to explore different categories and showcase diverse talents."
    },
    {
      question: 'What should i do if i need to participate in a team competition?',
      answer: 'You can simply ask for your team leader to register the team. The team leader will need to provide the certain informations of all team members during the registration process.'
    },
    {
      question: 'How are winners selected and prizes distributed?',
      answer: 'Each competition has a panel of expert judges who evaluate submissions based on predefined criteria. Winners are announced at the closing ceremony, and prizes are distributed within 2 weeks of the event via e-wallet such as DANA, Gopay, OVO or any bank transfer.'
    },
    {
      question: 'Do I need to bring my own equipment?',
      answer: 'For most competitions, basic equipment like laptops, design software, and presentation materials should be brought by participants. Specialized equipment will be provided when necessary - check competition requirements.'
    },
    {
      question: 'Is there support for international students?',
      answer: 'Yes! We welcome international students and provide additional support including visa documentation for prizes, translation services, and cultural orientation sessions.'
    },
    {
      question: 'How can I prepare for competitions?',
      answer: 'We offer preparation workshops, practice sessions, and mentorship programs leading up to the competitions. Check our events calendar and sign up for relevant preparation activities.'
    },
    {
      question: 'What if I have technical issues during online competitions?',
      answer: 'We have a dedicated technical support team available during all online events. Contact information and troubleshooting guides are provided to all registered participants before the competition starts.'
    },
  ];

  return (
    <section id="faq" className="bg-gradient-to-b from-emerald-950 to-gray-900 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 text-center">
          <div
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 sm:h-16 sm:w-16">
            <HelpCircle className="h-6 w-6 text-white sm:h-8 sm:w-8"/>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-100 sm:text-4xl md:text-5xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                  Questions
                                </span>
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-sm text-gray-400 sm:text-base md:text-lg">
            Find answers to common questions about our competitions, registration process, and participation
            requirements
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-3">
          <div className="space-y-7">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
                className="border-none rounded-lg bg-teal-900/80"
              >
                <CollapsibleTrigger
                  className="flex w-full items-center justify-between p-4 text-left rounded-lg hover:bg-teal-800/90 transition-colors">
                  <span className="font-medium text-gray-100 text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-teal-300 transition-transform duration-200 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t border-teal-500 bg-emerald-900/70 rounded-b-lg">
                  <div className="pt-2 text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        <Card className="mt-10 border-none bg-gradient-to-b from-teal-300 to-emerald-500 sm:mt-12">
          <CardContent className="p-6 text-center sm:p-8">
            <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">Still have questions?</h3>
            <p className="mx-auto mb-6 max-w-2xl text-pretty text-sm text-gray-800 sm:text-base">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you with any
              questions
              about competitions, registration, or participation.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="mailto:fostiums@gmail.com"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:scale-[1.02] sm:px-6"
              >
                Email Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center rounded-xl border-2 border-teal-600 px-5 py-3 font-semibold text-teal-700 transition-all duration-300 hover:bg-teal-600 hover:text-white sm:px-6"
              >
                Call Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;