import {Card} from "@/components/ui/card.tsx";
import {Award, Trophy, Users} from "lucide-react";
import AnimatedContent from './ui/AnimatedContent/AnimatedContent';
import {Vortex} from "./ui/vortex";

const stats = [
  {
    icon: <Users className="w-6 h-6 text-orange-400"/>,
    bg: "bg-orange-900",
    border: "border-orange-800 hover:border-orange-600",
    value: "2,500+",
    label: "Registered Participants",
    duration: 1,
  },
  {
    icon: <Award className="w-6 h-6 text-teal-300"/>,
    bg: "bg-teal-900",
    border: "border-teal-800 hover:border-teal-600",
    value: "15",
    label: "Competition Categories",
    duration: 1.25,
  },
  {
    icon: <Trophy className="w-6 h-6 text-white"/>,
    bg: "bg-gradient-to-br from-orange-700 to-teal-800",
    border: "border-orange-800 hover:border-orange-600",
    value: "Rp2,5M",
    label: "Total Prize Pool",
    duration: 1.5,
  },
];

const Stats = () => (
  <section id="stats" className="w-full py-20 bg-gradient-to-b from-gray-900 to-emerald-600 overflow-hidden">
    <Vortex
      backgroundColor="black"
      rangeY={800}
      particleCount={200}
      baseHue={190}
    >
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
          Win Amazing <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Pool Prizes !</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Join thousands of participants and compete for exciting prizes across multiple categories. Experience the
          thrill and showcase your skills!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto py-20">
        {stats.map((stat) => (
          <AnimatedContent
            key={stat.label}
            distance={300}
            direction="vertical"
            reverse={false}
            duration={stat.duration}
            ease="Power3.in"
            initialOpacity={0}
            animateOpacity
            scale={1}
          >
            <Card
              className={`bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border-2 ${stat.border} transition-colors`}>
              <div className={`flex items-center justify-center w-12 h-12 ${stat.bg} rounded-xl mb-4 mx-auto`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </Card>
          </AnimatedContent>
        ))}
      </div>
    </Vortex>
  </section>
);

export default Stats;