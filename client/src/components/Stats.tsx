import {Card} from "@/components/ui/card.tsx";
import {Award, Trophy, Users} from "lucide-react";

const Stats = () => {
  return (
    <section id={'stats'} className={"w-full py-20 bg-gradient-to-b from-gray-900 to-emerald-600"}>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
          Win Amazing <span
          className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Pool Prizes !</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Join thousands of participants and compete for exciting prizes across multiple categories. Experience the
          thrill and showcase your skills!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto py-20">
        <Card
          className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-800 hover:border-orange-600 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-900 rounded-xl mb-4 mx-auto">
            <Users className="w-6 h-6 text-orange-400"/>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">2,500+</h3>
          <p className="text-gray-300">Registered Participants</p>
        </Card>

        <Card
          className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-teal-800 hover:border-teal-600 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 bg-teal-900 rounded-xl mb-4 mx-auto">
            <Award className="w-6 h-6 text-teal-300"/>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">15</h3>
          <p className="text-gray-300">Competition Categories</p>
        </Card>

        <Card
          className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-800 hover:border-orange-600 transition-colors">
          <div
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-700 to-teal-800 rounded-xl mb-4 mx-auto">
            <Trophy className="w-6 h-6 text-white"/>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">Rp2,5M</h3>
          <p className="text-gray-300">Total Prize Pool</p>
        </Card>
      </div>
    </section>
  );
};

export default Stats;
