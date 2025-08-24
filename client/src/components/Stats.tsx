import {Card} from "@/components/ui/card.tsx";
import {Award, Trophy, Users} from "lucide-react";
import AnimatedContent from './ui/AnimatedContent/AnimatedContent';
import {useCompetitionContext} from "@/hooks/context.ts";

const Stats = () => {
  const data = useCompetitionContext();

  const totalParticipants = data.reduce((sum, c) => sum + (Number(c.totalParticipants) || 0), 0);
  const formattedTotalParticipants = new Intl.NumberFormat("en-US").format(totalParticipants);

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-orange-400"/>,
      bg: "bg-orange-900",
      border: "border-orange-800 hover:border-orange-600",
      value: formattedTotalParticipants,
      label: "Registered Participants",
      duration: 1,
    },
    {
      icon: <Award className="w-6 h-6 text-teal-300"/>,
      bg: "bg-teal-900",
      border: "border-teal-800 hover:border-teal-600",
      value: "3",
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
  return (
    <section id="stats"
             className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-emerald-600 overflow-hidden">
      <div className="text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-100 mb-4 sm:mb-6">
          Win Amazing <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Pool Prizes !</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Join thousands of participants and compete for exciting prizes across multiple categories. Experience the
          thrill and showcase your skills!
        </p>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto py-10 sm:py-16 md:py-20 px-4">
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
              className={`bg-gray-900/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border-2 ${stat.border} transition-colors`}>
              <div className={`flex items-center justify-center w-12 h-12 ${stat.bg} rounded-xl mb-4 mx-auto`}>
                {stat.icon}
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 text-center sm:text-start">{stat.value}</h3>
              <p className="text-gray-300 text-sm sm:text-base text-center sm:text-start">{stat.label}</p>
            </Card>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
};

export default Stats;