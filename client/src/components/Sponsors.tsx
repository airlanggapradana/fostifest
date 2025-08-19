import {Card, CardContent, CardDescription, CardTitle} from './ui/card';
import {Button} from './ui/button';
import {FaWhatsapp} from "react-icons/fa";

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-14 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4 sm:mb-6">
            Our <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-400">Sponsors</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            We're grateful to our amazing sponsors who make these competitions possible and support student innovation
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10 sm:mt-16 text-center">
          <Card className="bg-gradient-to-b from-emerald-300 to-teal-600 border-none">
            <CardContent className="p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Interested in
                Sponsoring?</CardTitle>
              <CardDescription className="text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Contact us to learn how you can support our event and connect with talented students.
              </CardDescription>
              <Button
                size="lg"
                className="flex items-center justify-center mx-auto gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6"/>
                Become a Sponsor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;