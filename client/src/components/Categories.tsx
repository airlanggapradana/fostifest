import {Code, Palette, Lightbulb, Calculator, Globe, Heart, Mic, Camera, Music} from 'lucide-react';
import {Card, CardContent, CardDescription, CardTitle} from './ui/card';

const Categories = () => {
  const categories = [
    {
      icon: Code,
      name: 'Programming',
      description: 'Algorithm challenges and software development',
      color: 'from-blue-500 to-purple-600',
      participants: 450,
      prizes: '$8,000'
    },
    {
      icon: Palette,
      name: 'Design',
      description: 'UI/UX design and digital art competitions',
      color: 'from-pink-500 to-rose-600',
      participants: 320,
      prizes: '$6,000'
    },
    {
      icon: Lightbulb,
      name: 'Innovation',
      description: 'Startup pitches and innovative solutions',
      color: 'from-yellow-500 to-orange-600',
      participants: 280,
      prizes: '$10,000'
    },
    {
      icon: Calculator,
      name: 'Mathematics',
      description: 'Complex problem solving and analysis',
      color: 'from-green-500 to-teal-600',
      participants: 180,
      prizes: '$4,000'
    },
    {
      icon: Globe,
      name: 'Business',
      description: 'Case studies and strategic planning',
      color: 'from-indigo-500 to-blue-600',
      participants: 200,
      prizes: '$7,000'
    },
    {
      icon: Heart,
      name: 'Healthcare',
      description: 'Medical innovation and research',
      color: 'from-red-500 to-pink-600',
      participants: 150,
      prizes: '$5,000'
    },
    {
      icon: Mic,
      name: 'Public Speaking',
      description: 'Debates and presentation skills',
      color: 'from-purple-500 to-indigo-600',
      participants: 120,
      prizes: '$3,000'
    },
    {
      icon: Camera,
      name: 'Photography',
      description: 'Visual storytelling and composition',
      color: 'from-gray-500 to-slate-600',
      participants: 250,
      prizes: '$4,500'
    },
    {
      icon: Music,
      name: 'Music',
      description: 'Composition and performance',
      color: 'from-violet-500 to-purple-600',
      participants: 180,
      prizes: '$3,500'
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Competition <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Categories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover your passion and showcase your talents across diverse fields of expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className="group relative hover:border-emerald-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-900 border-gray-800"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-500`}></div>

                <CardContent className="relative p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8"/>
                  </div>

                  <CardTitle
                    className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-teal-400 transition-colors">
                    {category.name}
                  </CardTitle>

                  <CardDescription className="text-gray-400 mb-6 leading-relaxed">
                    {category.description}
                  </CardDescription>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div>
                      <p className="text-sm text-gray-400">Participants</p>
                      <p className="text-lg font-semibold text-gray-100">{category.participants}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Prize Pool</p>
                      <p className="text-lg font-semibold text-emerald-400">{category.prizes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;