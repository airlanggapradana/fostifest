import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Award, Calendar, Trophy, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Card} from "@/components/ui/card.tsx";

const Hero = () => {
  return (
    <section id="home"
             className="pt-16 min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <img
          src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="University campus background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <Badge variant="secondary"
                 className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 font-medium mb-8">
            <Calendar className="w-4 h-4 mr-2"/>
            Registration Open Until March 2025
          </Badge>

          <h3
            className="text-sm font-medium text-emerald-100 tracking-widest uppercase drop-shadow-md">
            Forum Open Source Teknik Informatika presents
          </h3>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-t from-emerald-300 to-teal-500 bg-clip-text text-transparent leading-relaxed drop-shadow-lg -tracking-tighter">
            FOSTIFEST
          </h1>

          <p className="text-lg text-white mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Join the most prestigious academic competition of the year. Showcase your talents,
            compete with the best minds, and win amazing prizes.
          </p>

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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4 mx-auto">
                <Users className="w-6 h-6 text-orange-600"/>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2,500+</h3>
              <p className="text-gray-600">Registered Participants</p>
            </Card>

            <Card
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-teal-100 hover:border-teal-200 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4 mx-auto">
                <Award className="w-6 h-6 text-teal-600"/>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">Competition Categories</p>
            </Card>

            <Card
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <div
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-teal-600 rounded-xl mb-4 mx-auto">
                <Trophy className="w-6 h-6 text-white"/>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$50K+</h3>
              <p className="text-gray-600">Total Prize Pool</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
