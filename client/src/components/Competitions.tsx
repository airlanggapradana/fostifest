import {useState} from 'react';
import {Calendar, Clock, Users, Trophy, MapPin, Filter} from 'lucide-react';
import {Button} from './ui/button';
import {Card, CardContent, CardDescription, CardTitle} from './ui/card';
import {Badge} from './ui/badge';

const Competitions = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const competitions = [
    {
      id: 1,
      title: 'CodeMaster Challenge',
      category: 'Programming',
      date: 'March 15, 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Tech Hub Auditorium',
      participants: 120,
      prize: '$5,000',
      difficulty: 'Advanced',
      status: 'Open',
      description: 'Test your algorithmic skills in this intensive programming competition.',
      requirements: ['Laptop required', 'Any programming language', 'Individual participation']
    },
    {
      id: 2,
      title: 'Design Thinking Workshop',
      category: 'Design',
      date: 'March 18, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Creative Arts Building',
      participants: 80,
      prize: '$3,500',
      difficulty: 'Intermediate',
      status: 'Open',
      description: 'Create innovative user experiences and visual designs.',
      requirements: ['Design software knowledge', 'Team of 2-4', 'Portfolio submission']
    },
    {
      id: 3,
      title: 'Startup Pitch Competition',
      category: 'Innovation',
      date: 'March 22, 2025',
      time: '2:00 PM - 8:00 PM',
      location: 'Business School Amphitheater',
      participants: 60,
      prize: '$10,000',
      difficulty: 'Advanced',
      status: 'Open',
      description: 'Present your startup idea to industry experts and investors.',
      requirements: ['Business plan', '10-minute pitch', 'Team of 3-5']
    },
    {
      id: 4,
      title: 'Math Olympiad',
      category: 'Mathematics',
      date: 'March 25, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Science Building Room 201',
      participants: 90,
      prize: '$2,500',
      difficulty: 'Advanced',
      status: 'Open',
      description: 'Solve complex mathematical problems under time pressure.',
      requirements: ['Calculator allowed', 'Individual competition', 'University student ID']
    },
    {
      id: 5,
      title: 'Case Study Analysis',
      category: 'Business',
      date: 'March 28, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Business Center Conference Room',
      participants: 100,
      prize: '$4,000',
      difficulty: 'Intermediate',
      status: 'Open',
      description: 'Analyze real-world business scenarios and present solutions.',
      requirements: ['Team of 3-4', 'Presentation skills', 'Business background preferred']
    },
    {
      id: 6,
      title: 'Healthcare Innovation Summit',
      category: 'Healthcare',
      date: 'April 2, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Medical School Auditorium',
      participants: 70,
      prize: '$6,000',
      difficulty: 'Advanced',
      status: 'Closing Soon',
      description: 'Develop innovative solutions for healthcare challenges.',
      requirements: ['Medical/healthcare background', 'Research proposal', 'Team of 2-5']
    }
  ];

  const filters = ['All', 'Programming', 'Design', 'Innovation', 'Mathematics', 'Business', 'Healthcare'];

  const filteredCompetitions = activeFilter === 'All'
    ? competitions
    : competitions.filter(comp => comp.category === activeFilter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Closing Soon':
        return 'bg-orange-100 text-orange-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="competitions" className="py-20 bg-gradient-to-br from-gray-900 to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Upcoming <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-400">Competitions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Register now for exciting competitions and showcase your skills on the biggest stage
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-gray-400 mt-2 mr-2"/>
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCompetitions.map((competition, index) => (
            <Card
              key={competition.id}
              className="hover:border-teal-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gray-950 border-gray-800"
              style={{animationDelay: `${index * 150}ms`}}
            >
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-100 mb-2">{competition.title}</CardTitle>
                    <Badge variant="secondary" className="bg-teal-900 text-teal-300">
                      {competition.category}
                    </Badge>
                  </div>
                  <div className="space-x-3">
                    <Badge variant="secondary" className={`mb-2 ${getStatusColor(competition.status)}`}>
                      {competition.status}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(competition.difficulty)}>
                      {competition.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardDescription
                  className="text-gray-400 mb-6 leading-relaxed">{competition.description}</CardDescription>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-200">{competition.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-gray-200">{competition.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-200">{competition.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Trophy className="w-5 h-5 mr-3 text-teal-400"/>
                    <div>
                      <p className="text-sm text-gray-500">Prize</p>
                      <p className="font-medium text-white">{competition.prize}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-5 h-5 mr-2"/>
                      <span className="text-sm">{competition.participants} registered</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Requirements:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {competition.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105">
                    Register Now
                  </Button>
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