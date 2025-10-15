import {TrainerCard} from "@/components/TrainerCard.tsx";
import pemateri from '@/assets/pemateri.webp'

const Workshop = () => {
  return (
    <div className="space-y-6 sm:space-y-8 py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="text-center">
        <h2
          className="text-xl  font-bold text-gray-100 p-2 bg-teal-500/30 max-w-[10rem] mx-auto rounded-lg">
          Workshop
        </h2>
        <h1
          className="text-4xl md:text-5xl max-w-4xl py-5 mx-auto font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">
          Build Your Own AI Agent: LangGraph & Agentic Intelligence
        </h1>
      </div>

      <div className={'max-w-5xl mx-auto px-5'}>
        <TrainerCard
          name="Firania Putri Harsanti"
          role="Software and DevOps Engineer"
          bio="an AI Engineer, tech entrepreneur, and speaker passionate about building human-centered innovations.
She is the Founder and CEO of Neutrack AI Glove, a multi-award-winning startup transforming assistive technology for visual impairments through AI and IoT."
          imageUrl={pemateri}
          expertise={["Artificial Intelligence", "Software Engineering & DevOps", "IoT & Embedded Systems", "Tech Entrepreneurship", "UI/UX & Design Thinking"]}
        />
      </div>
    </div>
  );
};

export default Workshop;
