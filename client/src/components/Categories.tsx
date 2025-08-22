import {Code, Palette, Lightbulb} from 'lucide-react';
import {Card, CardContent, CardContent as ShadCardContent} from './ui/card';
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {useCompetitionContext} from "@/hooks/context.ts";

const Categories = () => {
  const data = useCompetitionContext();

  const categories = [
    {
      icon: Code,
      name: 'Programming',
      description: 'Design and development challenges for coders',
      color: 'from-blue-500 to-purple-600',
      participants: data.find(c => c.category === 'Programming')?.totalParticipants,
      prizes: data.find(c => c.category === 'Programming')?.prize
    },
    {
      icon: Palette,
      name: 'Design',
      description: 'UI/UX Web design and digital art competitions',
      color: 'from-pink-500 to-rose-600',
      participants: data.find(c => c.category === 'Design')?.totalParticipants,
      prizes: data.find(c => c.category === 'Programming')?.prize
    },
    {
      icon: Lightbulb,
      name: 'Literary',
      description: 'Scientific papers and academic research competitions',
      color: 'from-yellow-500 to-orange-600',
      participants: data.find(c => c.category === 'Literary')?.totalParticipants,
      prizes: data.find(c => c.category === 'Literary')?.prize
    },
  ];

  return (
    <section id="categories" className="py-10 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-3 sm:mb-6">
            Competition <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-teal-400">Categories</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Discover your passion and showcase your talents across diverse fields of expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index}>
                {/* Mobile: shadcn Card, no 3D */}
                <Card
                  className="block sm:hidden bg-gray-900 border-2 border-teal-700 rounded-xl max-w-[350px] mx-auto min-h-[300px]">
                  <ShadCardContent className="p-4 flex flex-col h-full">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl mb-3 text-white shadow-lg`}>
                      <IconComponent className="w-6 h-6"/>
                    </div>
                    <h1 className="text-lg font-bold text-gray-100 mb-1">{category.name}</h1>
                    <p className="text-gray-400 text-xs mb-3 leading-relaxed">{category.description}</p>
                    <div className="flex w-full justify-between items-center pt-2 border-t border-gray-800 mt-auto">
                      <div>
                        <p className="text-xs text-gray-400">Participants</p>
                        <p className="text-sm font-semibold text-gray-100">{category.participants}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Fees</p>
                        <p
                          className="text-sm font-semibold text-emerald-400">{category.prizes?.toLocaleString("id-ID", {
                          style: 'currency',
                          currency: 'IDR'
                        })}</p>
                      </div>
                    </div>
                  </ShadCardContent>
                </Card>
                {/* Desktop: 3D Card */}
                <CardContainer
                  className="hidden sm:block h-full min-h-[320px] group bg-gray-900 rounded-xl border-2 border-teal-700">
                  <CardBody className="relative">
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
                        className="text-gray-400 text-base mb-6 leading-relaxed"
                        translateZ={70}
                        as={'p'}
                      >
                        {category.description}
                      </CardItem>
                      <CardItem translateZ={120}
                                rotateX={20}
                                className="flex relative w-full justify-between items-center pt-4 border-t border-gray-800">
                        <CardItem>
                          <CardItem as={'p'} className="text-sm text-gray-400">Participants</CardItem>
                          <CardItem as={'p'}
                                    className="text-lg font-semibold text-gray-100">{category.participants}</CardItem>
                        </CardItem>
                        <CardItem className="text-right">
                          <CardItem className="text-sm text-gray-400" as={'p'}>Fees</CardItem>
                          <CardItem className="text-lg font-semibold text-emerald-400"
                                    as={'p'}>{category.prizes?.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          })}</CardItem>
                        </CardItem>
                      </CardItem>
                    </CardContent>
                  </CardBody>
                </CardContainer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;