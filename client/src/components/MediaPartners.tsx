import {Card, CardContent, CardDescription, CardTitle} from './ui/card';
import {Button} from './ui/button';
import {FaWhatsapp} from "react-icons/fa";
import LogoLoop from "@/components/ui/LogoLoop/LogoLoop.tsx";
import himatif from "@/assets/logoHimatifHitam.webp"
import rapma from "@/assets/WhatsApp Image 2025-10-30 at 17.34.17_674406f2.webp"
import medpart3 from "@/assets/Jika Poster HITAM - Logo 1600 pixel.webp"
import medpart4 from "@/assets/WhatsApp Image 2025-10-30 at 17.34.17_61535368.webp"
import medpart5 from "@/assets/WhatsApp Image 2025-10-30 at 17.34.17_bfa370d4.webp"
import medpart6 from "@/assets/WhatsApp Image 2025-10-30 at 17.34.17_fc83aa9f.webp"

const MediaPartners = () => {
  const imageLogos = [
    {
      src: himatif,
      alt: "Company 1",
      href: "#"
    },
    {
      src: rapma,
      alt: "Company 2",
      href: "#"
    },
    {
      src: medpart3,
      alt: "Company 3",
      href: "#"
    },
    {
      src: medpart4,
      alt: "Company 4",
      href: "#"
    },
    {
      src: medpart5,
      alt: "Company 5",
      href: "#"
    },
    {
      src: medpart6,
      alt: "Company 6",
      href: "#"
    },
  ];

  return (
    <section id="media-partners" className="py-14 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4 sm:mb-6">
            Media <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Partners</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Our media partners help us reach millions of students and share inspiring stories of innovation and
            achievement
          </p>
        </div>

        <div className="relative overflow-hidden bg-gray-900 border-2 border-teal-700 p-3 sm:p-4 rounded-xl">
          <LogoLoop
            logos={imageLogos}
            className="text-white"
            speed={75}
            direction="left"
            logoHeight={36}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="oklch(21% 0.034 264.665)"
            ariaLabel="Technology partners"
          />
        </div>

        {/* Call to Action */}
        <div className="mt-10 sm:mt-16 text-center">
          <Card className="bg-gradient-to-b from-emerald-300 to-teal-600 border-none">
            <CardContent className="p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Media Partnership
                Opportunities</CardTitle>
              <CardDescription className="text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Join our media partner network and help us amplify student voices and showcase innovative achievements.
              </CardDescription>
              <Button
                size="lg"
                className="flex mx-auto items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
                onClick={() => window.open("https://wa.me/+6285727689878")}
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6"/>
                Partner With Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MediaPartners;