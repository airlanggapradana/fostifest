import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {Calendar, Trophy, Award, Clock, MapPin} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

interface TimelineItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  details: string[];
}

const getTimelineStatus = (start: Date, end: Date, now: Date): 'completed' | 'current' | 'upcoming' => {
  if (now > end) return 'completed';
  if (now >= start && now <= end) return 'current';
  return 'upcoming';
};

const parseDateRange = (dateRange: string): [Date, Date] => {
  // Example: '18 Oktober - 25 November 2025'
  // or '3 - 5 November 2025'
  // or '30 November 2025'
  const months: { [key: string]: number } = {
    'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
    'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
  };
  const yearMatch = dateRange.match(/(\d{4})$/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();
  const parts = dateRange.replace(year.toString(), '').trim().split('-').map(s => s.trim());

  const parsePart = (part: string): Date => {
    const [day, month] = part.split(' ');
    if (month && months[month]) {
      return new Date(year, months[month], parseInt(day, 10));
    }
    // If only day is present, use the month from the other part
    return null as never;
  };

  if (parts.length === 2) {
    // Both parts may have day and month, or only day in the first part
    const [startPart, endPart] = parts;
    let startDate: Date;
    let endDate: Date;
    if (startPart.match(/[A-Za-z]/)) {
      startDate = parsePart(startPart);
    } else {
      // Only day, get month from endPart
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [endDay, endMonth] = endPart.split(' ');
      startDate = new Date(year, months[endMonth], parseInt(startPart, 10));
    }
    // eslint-disable-next-line prefer-const
    endDate = parsePart(endPart);
    return [startDate, endDate];
  } else if (parts.length === 1) {
    // Single date
    const [day, month] = parts[0].split(' ');
    return [new Date(year, months[month], parseInt(day, 10)), new Date(year, months[month], parseInt(day, 10))];
  }
  // fallback
  return [new Date(), new Date()];
};

const now = new Date();

const timelineData: TimelineItem[] = [
  {
    id: '1',
    phase: 'Phase 1',
    title: 'Registration Opens',
    description: 'Participants can register for the competition and submit their entries.',
    date: '18 Oktober - 25 November 2025',
    time: '',
    status: getTimelineStatus(...parseDateRange('18 Oktober - 25 November 2025'), now),
    icon: <Calendar className="w-6 h-6"/>,
    color: 'text-teal-300',
    bgColor: 'bg-teal-700 border-teal-200',
    details: [
      'Online registration form available',
      'Team formation period',
      'Entry fee payment deadline',
      'Initial documentation required'
    ]
  },
  {
    id: '2',
    phase: 'Phase 2',
    title: 'Judging Days',
    description: 'Judging sessions and evaluation of submissions by the panel of judges.',
    date: '3 - 5 November 2025',
    time: '',
    // location: 'Convention Center, Downtown',
    status: getTimelineStatus(...parseDateRange('3 - 5 November 2025'), now),
    icon: <Trophy className="w-6 h-6"/>,
    color: 'text-teal-300',
    bgColor: 'bg-teal-700 border-teal-200',
    details: [
      'Preliminary judging',
      'Final judging rounds',
    ]
  },
  {
    id: '3',
    phase: 'Phase 3',
    title: 'Technical Meeting',
    description: 'A briefing session for all selected candidates to compete in the final round.',
    date: '8 - 11 November 2025',
    time: '',
    // location: 'Grand Ballroom, Convention Center',
    status: getTimelineStatus(...parseDateRange('8 - 23 November 2025'), now),
    icon: <Award className="w-6 h-6"/>,
    color: 'text-teal-300',
    bgColor: 'bg-teal-700 border-teal-200',
    details: [
      'Final Competition rules briefing',
      'Technical Meeting Finalists UI/UX: 8 November 2025',
      'Technical Meeting Finalis Software Dev: 9 November 2025',
      'Technical Meeting Line Follower: 22 November 2025',
      'Technical Meeting Sumobot: 23 November 2025'
    ]
  },
  {
    id: '4',
    phase: 'Phase 4',
    title: 'Final Competition D-Day',
    description: 'The grand finale where finalists compete for the top prizes.',
    date: '30 November 2025',
    time: '',
    // location: 'Grand Ballroom, Convention Center',
    status: getTimelineStatus(...parseDateRange('30 November 2025'), now),
    icon: <Award className="w-6 h-6"/>,
    color: 'text-teal-300',
    bgColor: 'bg-teal-700 border-teal-200',
    details: [
      'Final Competition UI/UX, Software Dev, Line Follower, and Sumobot'
    ]
  }
];

const getStatusConfig = (status: TimelineItem['status']) => {
  switch (status) {
    case 'completed':
      return {
        badge: 'Completed',
        badgeVariant: 'secondary' as const,
        pulseColor: 'bg-green-500',
        lineColor: 'bg-green-500'
      };
    case 'current':
      return {
        badge: 'In Progress',
        badgeVariant: 'secondary' as const,
        pulseColor: 'bg-emerald-500',
        lineColor: 'bg-emerald-500'
      };
    case 'upcoming':
      return {
        badge: 'Upcoming',
        badgeVariant: 'secondary' as const,
        pulseColor: 'bg-gray-400',
        lineColor: 'bg-gray-300'
      };
  }
};

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          if (target === headerRef.current) {
            setIsHeaderVisible(true);
          } else {
            // Timeline item
            const itemId = target.getAttribute('data-timeline-id');
            if (itemId) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, itemId]));
              }, 100);
            }
          }
        }
      });
    }, observerOptions);

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe stats section
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    // Observe timeline items
    Object.values(timelineRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id={'timeline'} className="min-h-screen bg-gradient-to-b from-emerald-950 via-teal-800 to-emerald-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            Competition <span
            className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Timeline</span>
          </h1>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-6 duration-700 delay-200">
            Follow the journey from registration to awarding. Track each phase of our
            exciting competition and stay updated with all important milestones.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div
            className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal-400 transform md:-translate-x-0.5 transition-all duration-1000 delay-500 ${isHeaderVisible ? 'scale-y-100' : 'scale-y-0'} origin-top`}></div>

          {timelineData.map((item, index) => {
            const statusConfig = getStatusConfig(item.status);
            const isEven = index % 2 === 0;
            const isVisible = visibleItems.has(item.id);

            return (
              <div
                key={item.id}
                ref={(el) => {
                  timelineRefs.current[item.id] = el;
                }}
                data-timeline-id={item.id}
                className={`relative mb-16 last:mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full ${statusConfig.lineColor} z-10 transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
                  {item.status === 'current' && (
                    <div
                      className={`absolute inset-0 rounded-full ${statusConfig.pulseColor} animate-ping opacity-75`}></div>
                  )}
                  {item.status === 'current' && (
                    <div className={`absolute inset-1 rounded-full ${statusConfig.pulseColor} animate-pulse`}></div>
                  )}
                </div>

                {/* Content */}
                <div className={`md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className={`md:w-1/2 ml-16 md:ml-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card
                      className={`${item.bgColor} border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 group cursor-pointer transform-gpu ${isVisible ? 'animate-in slide-in-from-bottom-4' : ''}`}>
                      <CardContent className="p-6">
                        {/* Phase Badge */}
                        <div
                          className="flex items-center justify-between mb-4 animate-in fade-in duration-700 delay-100">
                          <Badge variant={statusConfig.badgeVariant}
                                 className="font-semibold transition-all duration-300 hover:scale-110">
                            {statusConfig.badge}
                          </Badge>
                          <span
                            className="text-sm font-medium text-gray-100 transition-colors duration-300 group-hover:text-teal-200">
                            {item.phase}
                          </span>
                        </div>

                        {/* Icon and Title */}
                        <div className="flex items-center mb-4 animate-in fade-in duration-700 delay-200">
                          <div
                            className={`${item.color} mr-4 group-hover:scale-125 transition-all duration-500 ease-out`}>
                            {item.icon}
                          </div>
                          <h3
                            className="text-xl font-bold text-gray-100 group-hover:text-teal-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p
                          className="text-gray-300 mb-4 leading-relaxed animate-in fade-in duration-700 delay-300 group-hover:text-gray-300/80 transition-colors duration-300">
                          {item.description}
                        </p>

                        {/* Date and Time */}
                        <div
                          className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-100 animate-in fade-in duration-700 delay-400">
                          <div className="flex items-center transition-all duration-300 hover:scale-105">
                            <Clock className="w-4 h-4 mr-2"/>
                            <span className="font-medium">{item.date}</span>
                          </div>
                          {item.time && (
                            <div className="flex items-center transition-all duration-300 hover:scale-105">
                              <span className="font-medium">{item.time}</span>
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center transition-all duration-300 hover:scale-105">
                              <MapPin className="w-4 h-4 mr-2"/>
                              <span className="font-medium">{item.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="space-y-2 animate-in fade-in duration-700 delay-500">
                          {item.details.map((detail, detailIndex) => (
                            <div key={detailIndex}
                                 className={`flex items-center text-sm text-gray-100 transition-all duration-300 hover:translate-x-2 hover:text-teal-300 ${isVisible ? 'animate-in slide-in-from-left-2' : ''}`}
                                 style={{animationDelay: `${600 + detailIndex * 100}ms`}}>
                              <div
                                className="w-1.5 h-1.5 bg-teal-300 rounded-full mr-3 flex-shrink-0 transition-all duration-300 hover:bg-teal-400 hover:scale-125"></div>
                              <span className="transition-all duration-300">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;