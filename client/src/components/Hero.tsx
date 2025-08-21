import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Calendar} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import vid from "@/assets/fixed.mp4"
import TextType from '../components/ui/TextType/TextType';
import {useNavigate} from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50 pointer-events-none select-none">
        <video
          src={vid}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          aria-label="University campus background"
        />
        <div
          className="absolute top-10 left-4 w-20 h-20 sm:top-20 sm:left-10 sm:w-32 sm:h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div
          className="absolute top-24 right-6 w-16 h-16 sm:top-40 sm:right-20 sm:w-24 sm:h-24 bg-teal-500 rounded-full blur-2xl"></div>
        <div
          className="absolute bottom-10 left-1/4 w-24 h-24 sm:bottom-20 sm:w-40 sm:h-40 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center justify-center min-h-screen">
        <div className="text-center w-full">
          <Badge
            variant="secondary"
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-600 text-white font-semibold mb-6 sm:mb-8 text-xs sm:text-base"
          >
            <Calendar className="w-4 h-4 mr-2"/>
            Registration Open Until March 2025
          </Badge>

          <h3
            className="text-xs sm:text-sm font-medium max-w-xs sm:max-w-md leading-relaxed mx-auto text-emerald-100 tracking-widest uppercase drop-shadow-md">
            Forum Open Source Teknik Informatika Universitas Muhammadiyah Surakarta Presents
          </h3>

          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-title bg-gradient-to-t from-emerald-300 to-teal-500 bg-clip-text text-transparent leading-relaxed drop-shadow-lg mt-2 sm:mt-4">
            FOSTIFEST
          </h1>

          <TextType
            text={[
              "Join the most prestigious academic competition of the year. Showcase your talents,\ncompete with the best minds, and win amazing prizes.",
              "Compete in various categories including programming, design, and more.",
              "Network with industry leaders and fellow students.",
              "Gain recognition and enhance your resume with this prestigious event.",
            ]}
            typingSpeed={30}
            pauseDuration={2000}
            deletingSpeed={10}
            textColors={['oklch(87.2% 0.01 258.338)']}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            className="mb-5 sm:mb-7 text-gray-400 text-base sm:text-lg font-semibold leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 w-full">
            <Button
              size="lg"
              className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate('/register')}
            >
              Register Now
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300"
            >
              View Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;