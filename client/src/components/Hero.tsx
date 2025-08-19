import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Calendar} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import bg from '../assets/bg_2.png'
import TextType from '../components/ui/TextType/TextType';

const Hero = () => {
  return (
    <section id="home"
             className=" min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <img
          src={bg}
          alt="University campus background"
          className="w-full h-full object-center bg-cover "
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Badge variant="secondary"
                 className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-semibold mb-8">
            <Calendar className="w-4 h-4 mr-2"/>
            Registration Open Until March 2025
          </Badge>

          <h3
            className="text-sm font-medium max-w-md leading-relaxed mx-auto text-emerald-100 tracking-widest uppercase drop-shadow-md">
            Forum Open Source Teknik Informatika Universitas Muhammadiyah Surakarta Presents
          </h3>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-title bg-gradient-to-t from-emerald-300 to-teal-500 bg-clip-text text-transparent leading-relaxed drop-shadow-lg">
            FOSTIFEST
          </h1>

          <TextType
            text={["Join the most prestigious academic competition of the year. Showcase your talents,\n" +
            "compete with the best minds, and win amazing prizes.", "Compete in various categories including programming, design, and more.", "Network with industry leaders and fellow students.", "Gain recognition and enhance your resume with this prestigious event."]}
            typingSpeed={30}
            pauseDuration={2000}
            deletingSpeed={10}
            textColors={['oklch(87.2% 0.01 258.338)']}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            className={"mb-7 text-gray-400 text-lg font-semibold leading-relaxed "}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg"
                    className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Register Now
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </Button>
            <Button variant="outline" size="lg"
                    className="px-8 py-4 border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300">
              View Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
