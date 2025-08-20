import {useState} from 'react';
import {ChevronDown, ChevronUp, HelpCircle} from 'lucide-react';
import {Card, CardContent} from './ui/card';
import {Button} from "@/components/ui/button.tsx";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How do I register for competitions?",
      answer: "Registration is simple! Click the login button on any the navbar, log in to your existing account or create a new one, then navigate to the Competitions section and select the competition you want to enter. Fill out the registration form and submit it before the deadline."
    },
    {
      question: "What are the eligibility requirements?",
      answer: "Participants must be currently enrolled university students with a valid student ID."
    },
    {
      question: "Can I participate in multiple competitions?",
      answer: "Absolutely! You can register for as many competitions as you'd like, as long as the schedules don't conflict. We encourage students to explore different categories and showcase diverse talents."
    },
    {
      question: "What happens if I need to withdraw from a competition?",
      answer: "You can withdraw from a competition up to 48 hours before the event starts. Simply contact our support team or use the withdrawal option in your registration dashboard."
    },
    {
      question: "How are winners selected and prizes distributed?",
      answer: "Each competition has a panel of expert judges who evaluate submissions based on predefined criteria. Winners are announced at the closing ceremony, and prizes are distributed within 2 weeks of the event via e-wallet such as DANA, Gopay, OVO or any bank transfer."
    },
    {
      question: "Do I need to bring my own equipment?",
      answer: "For most competitions, basic equipment like laptops, design software, and presentation materials should be brought by participants. Specialized equipment will be provided when necessary - check competition requirements."
    },
    {
      question: "Is there support for international students?",
      answer: "Yes! We welcome international students and provide additional support including visa documentation for prizes, translation services, and cultural orientation sessions."
    },
    {
      question: "How can I prepare for competitions?",
      answer: "We offer preparation workshops, practice sessions, and mentorship programs leading up to the competitions. Check our events calendar and sign up for relevant preparation activities."
    },
    {
      question: "What if I have technical issues during online competitions?",
      answer: "We have a dedicated technical support team available during all online events. Contact information and troubleshooting guides are provided to all registered participants before the competition starts."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-emerald-950 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white"/>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Frequently Asked <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our competitions, registration process, and participation
            requirements
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-gray-900 px-4 border-none transition-all duration-300"
            >
              <CardContent className="p-0 space-y-4">
                <Button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-100 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-teal-500 flex-shrink-0"/>
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0"/>
                  )}
                </Button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-teal-300 pt-4">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="mt-12 border-none bg-gradient-to-b from-teal-300 to-emerald-500">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you with any questions about
              competitions, registration, or participation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:fostiums@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
              >
                Email Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-700 rounded-xl font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300"
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