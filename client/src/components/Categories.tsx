import {Code, Palette, Lightbulb} from 'lucide-react';
import {CardContent} from './ui/card';
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";

const Categories = () => {
  const categories = [
    {
      icon: Code,
      name: 'Programming',
      description: 'Design and development challenges for coders',
      color: 'from-blue-500 to-purple-600',
      participants: 450,
      prizes: '$8,000'
    },
    {
      icon: Palette,
      name: 'Design',
      description: 'UI/UX Web design and digital art competitions',
      color: 'from-pink-500 to-rose-600',
      participants: 320,
      prizes: '$6,000'
    },
    {
      icon: Lightbulb,
      name: 'Literary',
      description: 'Scientific papers and academic research competitions',
      color: 'from-yellow-500 to-orange-600',
      participants: 280,
      prizes: '$10,000'
    },
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
              <CardContainer key={index} className={'h-full group bg-gray-900 rounded-xl border border-teal-700'}>
                <CardBody className={"relative"}>
                  <CardContent className="relative p-8 h-full">
                    <CardItem
                      translateZ={150}
                      rotateZ={15}
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8"/>

                    </CardItem>

                    <CardItem
                      translateZ={90}
                      className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-teal-400 transition-colors"
                      as={'h1'}
                    >
                      {category.name}
                    </CardItem>

                    <CardItem
                      className="text-gray-400 mb-6 leading-relaxed"
                      translateZ={70}
                      as={'p'}
                    >
                      {category.description}

                    </CardItem>

                    <CardItem translateZ={120}
                              rotateX={20}
                              className="flex relative w-full justify-between items-center pt-4 border-t border-gray-800">
                      <CardItem
                      >
                        <CardItem
                          as={'p'}
                          className="text-sm text-gray-400"
                        >
                          Participants
                        </CardItem>
                        <CardItem
                          as={'p'}
                          className="text-lg font-semibold text-gray-100"
                        >
                          {category.participants}
                        </CardItem>
                      </CardItem>
                      <CardItem className="text-right">
                        <CardItem className="text-sm text-gray-400" as={'p'}>Prize Pool</CardItem>
                        <CardItem className="text-lg font-semibold text-emerald-400"
                                  as={'p'}>{category.prizes}</CardItem>
                      </CardItem>
                    </CardItem>
                  </CardContent>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;