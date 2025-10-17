import {useState} from 'react';
import {Calendar, Clock, Users, MapPin, Filter, DollarSign, Book} from 'lucide-react';
import {Button} from './ui/button';
import {Card, CardContent, CardDescription, CardTitle} from './ui/card';
import {Badge} from './ui/badge';
import {useCompetitionContext} from "@/hooks/context.ts";
import {useNavigate} from "react-router";

const Competitions = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const data = useCompetitionContext()

  const competitions = [
    {
      id: data.find(c => c.category === 'Programming')?.id,
      title: data.find(c => c.category === 'Programming')?.name,
      category: 'Programming',
      date: (() => {
        const comp = data.find(c => c.category === 'Programming' && c.startDate && c.endDate);
        if (comp) {
          const start = new Date(comp.startDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const end = new Date(comp.endDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          return start === end ? start : `${start} - ${end}`;
        }
        return 'TBA';
      })(),
      time: data.find(c => c.category === 'Programming' && c.deadline)
        ? new Date(data.find(c => c.category === 'Programming')!.deadline).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
        : 'TBA',
      location: 'Online',
      participants: data.find(c => c.category === 'Programming')?.totalParticipants,
      prize: data.find(c => c.category === 'Programming')?.prize,
      status: data.find(c => c.category === 'Programming')?.status,
      description: 'Test your algorithmic skills in this intensive programming competition.',
      requirements: ['Laptop required', 'Any programming language', 'Up-to 3 members per team'],
      guidebook: 'https://docs.google.com/document/d/1uDzIMsJ9FZW_VHSdi6eVg6QIi402zrUs3MDmsMdUyLs/edit?usp=drive_link'
    },
    {
      id: data.find(c => c.category === 'Design')?.id,
      title: data.find(c => c.category === 'Design')?.name,
      category: 'Design',
      date: (() => {
        const comp = data.find(c => c.category === 'Design' && c.startDate && c.endDate);
        if (comp) {
          const start = new Date(comp.startDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const end = new Date(comp.endDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          return start === end ? start : `${start} - ${end}`;
        }
        return 'TBA';
      })(),
      time: data.find(c => c.category === 'Design' && c.deadline)
        ? new Date(data.find(c => c.category === 'Design')!.deadline).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
        : 'TBA',
      location: 'Online',
      participants: data.find(c => c.category === 'Design')?.totalParticipants,
      prize: data.find(c => c.category === 'Design')?.prize,
      status: data.find(c => c.category === 'Design')?.status,
      description: 'Create innovative user experiences and visual designs.',
      requirements: ['Design software knowledge', 'Team of 3'],
      guidebook: 'https://docs.google.com/document/d/1pdFQDHAEygrXelbC8xP_Zd4N-n6zf5zG_1PESpn9wKk/edit?usp=drive_link'
    },
    {
      ...(() => {
        const comp = data.find(c => c.name === 'Sumobot');
        return {
          id: comp?.id,
          title: comp?.name,
          category: 'Robotics',
          date: comp?.startDate && comp?.endDate
            ? (() => {
              const start = new Date(comp.startDate).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              const end = new Date(comp.endDate).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              return start === end ? start : `${start} - ${end}`;
            })()
            : 'TBA',
          time: comp?.deadline
            ? new Date(comp.deadline).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
            : 'TBA',
          location: 'Offline',
          participants: comp?.totalParticipants,
          prize: comp?.prize,
          status: comp?.status,
          description: 'Design and program robots to complete specific tasks.',
          requirements: [
            'Peserta terdiri dari 1–3 orang per tim (boleh dari SMA/SMK atau mahasiswa, sesuai kategori).',
            'Tiap tim hanya boleh mengirim 1 robot.',
            'Robot boleh menggunakan KIT atau buatan sendiri',
            'Wajib membawa source code, diagram rangkaian, dan dokumentasi robot saat verifikasi.'
          ],
          guidebook: 'https://docs.google.com/document/d/1LEDg899oLs4OqBRiBdG-OqtAJ2_UjP5AR3PARwikQ0k/edit?usp=drive_link'
        };
      })()
    },
    {
      ...(() => {
        const comp = data.find(c => c.name === 'Robot Line Follower');
        return {
          id: comp?.id,
          title: comp?.name,
          category: 'Robotics',
          date: comp?.startDate && comp?.endDate
            ? (() => {
              const start = new Date(comp.startDate).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              const end = new Date(comp.endDate).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              return start === end ? start : `${start} - ${end}`;
            })()
            : 'TBA',
          time: comp?.deadline
            ? new Date(comp.deadline).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
            : 'TBA',
          location: 'Offline',
          participants: comp?.totalParticipants,
          prize: comp?.prize,
          status: comp?.status,
          description: 'Design and program robots to complete specific tasks.',
          requirements: [
            'Peserta terdiri dari 1–3 orang per tim (boleh dari SMA/SMK atau mahasiswa, sesuai kategori).',
            'Tiap tim hanya boleh mengirim 1 robot.',
            'Robot boleh menggunakan KIT atau buatan sendiri',
            'Wajib membawa source code, diagram rangkaian, dan dokumentasi robot saat verifikasi.'
          ],
          guidebook: 'https://docs.google.com/document/d/1lwSBTcpFRRrfjI8RV6zv1Cy6zDSuVYTWpZ80G3J78rQ/edit?usp=drive_link'
        };
      })()
    },
    {
      id: data.find(c => c.category === 'Workshops')?.id,
      title: data.find(c => c.category === 'Workshops')?.name,
      category: 'Workshops',
      date: (() => {
        const comp = data.find(c => c.category === 'Workshops' && c.startDate && c.endDate);
        if (comp) {
          const start = new Date(comp.startDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const end = new Date(comp.endDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          return start === end ? start : `${start} - ${end}`;
        }
        return 'TBA';
      })(),
      time: data.find(c => c.category === 'Workshops' && c.deadline)
        ? new Date(data.find(c => c.category === 'Workshops')!.deadline).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
        : 'TBA',
      location: 'Online',
      participants: data.find(c => c.category === 'Workshops')?.totalParticipants,
      prize: data.find(c => c.category === 'Workshops')?.prize,
      status: data.find(c => c.category === 'Workshops')?.status,
      description: 'Build your own scalable web applications from scratch.',
      requirements: ['Paham apa itu “agent” dalam konteks AI (entitas yang bisa membuat keputusan berdasarkan tujuan & konteks).', 'Mengerti konsep system prompt, context window, tools, dan chain of thought (tanpa akses reasoning internal)', 'Laptop required'],
      guidebook: null
    },
  ];

  const filters = ['All', 'Programming', 'Design', 'Robotics', 'Workshops'];

  const filteredCompetitions = activeFilter === 'All'
    ? competitions
    : competitions.filter(comp => comp.category === activeFilter);

  const getStatusColor = (status: "UPCOMING" | "ONGOING" | "FINISHED" | "CANCELED" | undefined | string) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-green-100 text-green-800';
      case 'ONGOING':
        return 'bg-orange-100 text-orange-800';
      case 'FINISHED':
        return 'bg-red-100 text-red-800';
      case 'CANCELED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="competitions" className="py-14 sm:py-20 bg-gradient-to-b from-gray-900 to-emerald-950">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4 sm:mb-6">
            Upcoming <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-400">Competitions</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Register now for exciting competitions and showcase your skills on the biggest stage
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <Filter className="w-5 h-5 text-gray-400 mt-2 mr-2"/>
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                activeFilter === filter
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gray-900 text-gray-200 hover:bg-emerald-900 hover:text-emerald-400 border border-gray-700'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCompetitions.map((competition, index) => (
            <Card
              key={competition.id}
              className="hover:border-teal-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gray-950 border-gray-800 sm:max-w-7xl"
              style={{animationDelay: `${index * 150}ms`}}
            >
              <CardContent className="p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-2">
                  <div>
                    <CardTitle
                      className="text-lg sm:text-2xl font-bold text-gray-100 mb-1 sm:mb-2">{competition.title}</CardTitle>
                    <Badge variant="secondary" className="bg-teal-900 text-teal-300 text-xs sm:text-sm">
                      {competition.category}
                    </Badge>
                  </div>
                  <div className="space-x-0 sm:space-x-3">
                    <Badge variant="secondary"
                           className={`mb-2 ${getStatusColor(competition.status)} text-xs sm:text-sm font-semibold`}>
                      {competition.status}
                    </Badge>
                  </div>
                </div>

                <CardDescription className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {competition.description}
                </CardDescription>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-200 text-sm sm:text-base">{competition.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Registration Deadline</p>
                      <p className="font-medium text-gray-200 text-sm sm:text-base">{competition.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-200 text-sm sm:text-base">{competition.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Registration Fee</p>
                      <p
                        className="font-medium text-white text-sm sm:text-base">{competition.prize?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      })}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 sm:pt-6">
                  <div className="flex items-center text-gray-400 mb-3 sm:mb-4">
                    <Users className="w-5 h-5 mr-2"/>
                    <span className="text-xs sm:text-sm">{competition.participants} registered</span>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Requirements:</p>
                    <ul className="text-xs sm:text-sm text-gray-400 space-y-1">
                      {competition.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={'space-y-5'}>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      onClick={() => navigate(`/register-competition/${competition.id}`)}
                      disabled={competition.status !== 'ONGOING'}
                    >
                      {competition.status === 'ONGOING' ? 'Register Now' : 'Registration Closed'}
                    </Button>

                    {competition.guidebook && (
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                        onClick={() => window.open(competition.guidebook as string, '_blank')}
                      >
                        <Book/>
                        Guidebook
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;