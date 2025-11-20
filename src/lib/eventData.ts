export interface EventData {
  id: string;
  title: string;
  category: 'competition' | 'webinar' | 'workshop' | 'panel' | 'lecture' | 'interactive';
  day: 1 | 2 | 3;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  description: string;
  speaker?: {
    name: string;
    title: string;
    organization: string;
  };
  highlights: string[];
  capacity?: number;
  registrationStatus: 'open' | 'closed' | 'full' | 'coming-soon';
  registrationLink?: string;
  image?: string;
  color: string;
  gradient: string;
}

export const events: EventData[] = [
  // Day 1 - December 5, 2025
  {
    id: 'opening-ceremony',
    title: 'Opening Ceremony',
    category: 'lecture',
    day: 1,
    date: '2025-12-05',
    startTime: '09:00',
    endTime: '11:00',
    venue: 'Auditorium',
    description: 'Grand opening of ReXtro 2025: Silver Jubilee Exhibition celebrating 25 years of engineering excellence and innovation.',
    highlights: ['Welcome Address', 'Keynote Speech', 'Exhibition Overview', 'Industry Partner Introductions'],
    capacity: 500,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'mathquest',
    title: 'MathQuest',
    category: 'competition',
    day: 1,
    date: '2025-12-05',
    startTime: '08:30',
    endTime: '16:30',
    venue: 'NCC',
    description: 'A competitive mathematics quiz designed for top-performing A/L students across the country. Teams compete through multiple rounds of problem-solving, logic-based tasks, and timed challenges.',
    highlights: ['Rapid-fire question rounds', 'Analytical challenges', 'Top student participation'],
    capacity: 80,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    image: '/MathQuest.svg',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'xbotics',
    title: 'Xbotics',
    category: 'competition',
    day: 1,
    date: '2025-12-05',
    startTime: '11:00',
    endTime: '17:00',
    venue: 'DO1, DO2, LT1',
    description: 'A robotics competition that brings together school and university teams to compete in mechanical design, coding, and task-based robotic challenges.',
    highlights: ['Live robot challenges', 'Multidisciplinary engineering', 'School and university participation'],
    capacity: 950,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    image: '/Xbotix.svg',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },

  // Day 2 - December 6, 2025
  {
    id: 'techtalks',
    title: 'TechTalks',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '10:00',
    endTime: '17:30',
    venue: 'LT1 & LT2 (Semi-Final), Auditorium (Final)',
    description: 'A structured debate competition where university teams engage in high-level argumentation on contemporary topics.',
    highlights: ['Intense debates', 'Critical-thinking showcase', 'Expert judging'],
    capacity: 30,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'aeroxplore',
    title: 'AeroXplore',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '09:00',
    endTime: '16:00',
    venue: 'Hapugala School Ground',
    description: 'A practical aeronautics competition where teams design, build and fly RC aircraft.',
    highlights: ['Aerodynamics', 'Control precision', 'Endurance performance'],
    capacity: 100,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'haxtreme',
    title: 'Haxtreme',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '09:00',
    endTime: '13:00',
    venue: 'NCC',
    description: 'A programming contest where top scorers from the preliminary stage compete to solve complex algorithmic and logical problems.',
    highlights: ['Algorithms', 'Problem-solving', 'Code optimisation'],
    capacity: 100,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'rocketfest',
    title: 'RocketFest',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '08:30',
    endTime: '14:30',
    venue: 'Faculty Ground',
    description: 'A water rocket competition where teams design, build and launch model water rockets.',
    highlights: ['Rocket design', 'Safety procedures', 'Flight performance tracking'],
    capacity: 100,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'ieee-fyp-arena',
    title: 'IEEE FYP Arena | Final Year Project Exhibition',
    category: 'interactive',
    day: 2,
    date: '2025-12-06',
    startTime: '08:00',
    endTime: '17:00',
    venue: 'DO1 & DO2',
    description: 'A national exhibition presenting final-year engineering projects developed by undergraduates.',
    highlights: ['Robotics', 'Power and energy', 'Biomedical engineering', 'Software applications'],
    capacity: 200,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },

  // Day 3 - December 7, 2025
  {
    id: 'pitch-arena',
    title: 'Pitch Arena',
    category: 'competition',
    day: 3,
    date: '2025-12-07',
    startTime: '08:00',
    endTime: '14:00',
    venue: 'Auditorium',
    description: 'A high-impact startup pitch event where finalists present innovative business ideas to investors and industry professionals.',
    highlights: ['Investor feedback', 'Real-world business insight', 'Innovative project presentations'],
    capacity: 80,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    image: '/Pitch arena.svg',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'revit',
    title: 'Revit',
    category: 'competition',
    day: 3,
    date: '2025-12-07',
    startTime: '08:00',
    endTime: '14:00',
    venue: 'DO1 & DO2',
    description: 'A CAD design competition where participants produce detailed engineering models using Autodesk Revit under time-bound conditions.',
    highlights: ['Technical accuracy', 'Creative design', 'Engineering modelling'],
    capacity: 48,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'closing-ceremony',
    title: 'Closing Ceremony',
    category: 'lecture',
    day: 3,
    date: '2025-12-07',
    startTime: '17:30',
    endTime: '19:30',
    venue: 'Auditorium',
    description: 'Grand closing ceremony celebrating innovation, awarding outstanding projects, and networking with industry partners.',
    highlights: ['Award Presentations', 'Best Project Awards', 'Networking', 'Closing Address'],
    capacity: 400,
    registrationStatus: 'open',
    registrationLink: 'https://tickets.rextro.lk',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },
];

export const getCategoryLabel = (category: EventData['category']): string => {
  const labels = {
    competition: 'Competition',
    webinar: 'Webinar',
    workshop: 'Workshop',
    panel: 'Panel Discussion',
    lecture: 'Lecture',
    interactive: 'Interactive Session',
  };
  return labels[category];
};

export const getCategoryIcon = (category: EventData['category']): string => {
  const icons = {
    competition: '🏆',
    webinar: '💻',
    workshop: '⚙️',
    panel: '💬',
    lecture: '🎤',
    interactive: '🎯',
  };
  return icons[category];
};

export const getEventsByDay = (day: 1 | 2 | 3): EventData[] => {
  return events.filter(event => event.day === day).sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
};

export const getEventsByCategory = (category: EventData['category']): EventData[] => {
  return events.filter(event => event.category === category);
};
