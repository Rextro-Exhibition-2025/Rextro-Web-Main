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
    endTime: '10:30',
    venue: 'Main Auditorium',
    description: 'Grand opening of ReXtro 2025: Silver Jubilee Exhibition celebrating 25 years of engineering excellence and innovation.',
    highlights: ['Welcome Address', 'Keynote Speech', 'Exhibition Overview', 'Industry Partner Introductions'],
    capacity: 1000,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'ai-ml-webinar',
    title: 'Future of AI & Machine Learning',
    category: 'webinar',
    day: 1,
    date: '2025-12-05',
    startTime: '11:00',
    endTime: '12:30',
    venue: 'Virtual Hall A',
    description: 'Explore the cutting-edge developments in artificial intelligence and machine learning with industry experts from leading tech companies.',
    speaker: {
      name: 'Dr. Sarah Chen',
      title: 'AI Research Director',
      organization: 'Tech Innovations Inc.'
    },
    highlights: ['Neural Networks', 'Deep Learning Applications', 'AI Ethics', 'Industry Trends'],
    capacity: 500,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'robotics-workshop',
    title: 'Hands-on Robotics Workshop',
    category: 'workshop',
    day: 1,
    date: '2025-12-05',
    startTime: '13:30',
    endTime: '16:00',
    venue: 'Robotics Lab - Building C',
    description: 'Build and program your own robot in this intensive hands-on workshop covering sensors, actuators, and autonomous navigation.',
    highlights: ['Robot Assembly', 'Arduino Programming', 'Sensor Integration', 'Autonomous Navigation'],
    capacity: 30,
    registrationStatus: 'full',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'xbotix-day1',
    title: 'Xbotix Robotics Competition - Qualifiers',
    category: 'competition',
    day: 1,
    date: '2025-12-05',
    startTime: '14:00',
    endTime: '18:00',
    venue: 'Competition Arena - Outdoor Field',
    description: 'Island-wide robotics competition featuring autonomous robots competing in challenging obstacle courses and task-based challenges.',
    highlights: ['Autonomous Navigation', 'Object Manipulation', 'Speed Challenges', 'Innovation Awards'],
    capacity: 50,
    registrationStatus: 'closed',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },

  // Day 2 - December 6, 2025
  {
    id: 'sustainability-panel',
    title: 'Engineering for Sustainability',
    category: 'panel',
    day: 2,
    date: '2025-12-06',
    startTime: '09:30',
    endTime: '11:00',
    venue: 'Conference Hall B',
    description: 'Panel discussion with industry leaders on sustainable engineering practices, renewable energy, and climate change mitigation strategies.',
    speaker: {
      name: 'Panel of Experts',
      title: 'Industry Leaders',
      organization: 'Various'
    },
    highlights: ['Renewable Energy', 'Green Technology', 'Circular Economy', 'Climate Action'],
    capacity: 300,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'mathquest-finals',
    title: 'MathQuest Championship Finals',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'MathQuest Arena',
    description: 'Intense mathematical problem-solving competition where the brightest minds compete to solve complex engineering mathematics challenges.',
    highlights: ['Advanced Calculus', 'Applied Mathematics', 'Engineering Problems', 'Speed Solving'],
    capacity: 100,
    registrationStatus: 'closed',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'iot-webinar',
    title: 'IoT & Smart Systems Revolution',
    category: 'webinar',
    day: 2,
    date: '2025-12-06',
    startTime: '14:00',
    endTime: '15:30',
    venue: 'Virtual Hall B',
    description: 'Discover how Internet of Things is transforming industries with connected devices, smart cities, and industrial automation.',
    speaker: {
      name: 'Prof. Michael Rodriguez',
      title: 'IoT Solutions Architect',
      organization: 'Smart Systems Global'
    },
    highlights: ['Smart Devices', 'Industrial IoT', 'Edge Computing', 'Security Challenges'],
    capacity: 500,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'ar-vr-interactive',
    title: 'AR/VR Experience Sessions',
    category: 'interactive',
    day: 2,
    date: '2025-12-06',
    startTime: '10:00',
    endTime: '17:00',
    venue: 'AR/VR Zone - Building D',
    description: 'Immersive augmented and virtual reality experiences showcasing the latest in XR technology and applications.',
    highlights: ['VR Gaming', 'AR Applications', 'Mixed Reality', '360° Experiences'],
    registrationStatus: 'open',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'pitch-arena-semifinals',
    title: 'Pitch Arena - Startup Semifinals',
    category: 'competition',
    day: 2,
    date: '2025-12-06',
    startTime: '15:00',
    endTime: '18:00',
    venue: 'Pitch Arena - Main Stage',
    description: 'Aspiring entrepreneurs pitch their innovative startup ideas to a panel of investors and industry experts.',
    highlights: ['Startup Pitches', 'Investor Panel', 'Business Models', 'Innovation Showcase'],
    capacity: 200,
    registrationStatus: 'closed',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },

  // Day 3 - December 7, 2025
  {
    id: 'career-panel',
    title: 'Career Pathways in Engineering',
    category: 'panel',
    day: 3,
    date: '2025-12-07',
    startTime: '09:00',
    endTime: '11:00',
    venue: 'Conference Hall A',
    description: 'Career guidance panel featuring successful engineers sharing insights on career development, industry trends, and opportunities.',
    speaker: {
      name: 'Industry Professionals Panel',
      title: 'Senior Engineers & Managers',
      organization: 'Top Tech Companies'
    },
    highlights: ['Career Planning', 'Industry Insights', 'Skill Development', 'Networking Tips'],
    capacity: 400,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'cybersecurity-workshop',
    title: 'Ethical Hacking & Cybersecurity',
    category: 'workshop',
    day: 3,
    date: '2025-12-07',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'Computer Lab 3',
    description: 'Learn ethical hacking techniques, penetration testing, and cybersecurity best practices from certified security professionals.',
    speaker: {
      name: 'Jason Kumar',
      title: 'Cybersecurity Consultant',
      organization: 'SecureNet Solutions'
    },
    highlights: ['Penetration Testing', 'Network Security', 'Vulnerability Assessment', 'Security Tools'],
    capacity: 40,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'pitch-arena-finals',
    title: 'Pitch Arena - Grand Finals',
    category: 'competition',
    day: 3,
    date: '2025-12-07',
    startTime: '14:00',
    endTime: '17:00',
    venue: 'Main Stage',
    description: 'The ultimate showdown where top startups compete for funding and mentorship opportunities from leading investors.',
    highlights: ['Final Pitches', 'Investor Judging', 'Award Ceremony', 'Networking Session'],
    capacity: 500,
    registrationStatus: 'open',
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'xbotix-finals',
    title: 'Xbotix Grand Finals & Award Ceremony',
    category: 'competition',
    day: 3,
    date: '2025-12-07',
    startTime: '14:30',
    endTime: '17:30',
    venue: 'Competition Arena',
    description: 'The grand finale of the island-wide robotics competition with the top teams competing for the championship title.',
    highlights: ['Championship Round', 'Expert Judging', 'Award Presentation', 'Technology Showcase'],
    capacity: 300,
    registrationStatus: 'open',
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'closing-ceremony',
    title: 'Closing Ceremony & Gala Night',
    category: 'lecture',
    day: 3,
    date: '2025-12-07',
    startTime: '18:00',
    endTime: '20:00',
    venue: 'Main Auditorium',
    description: 'Grand closing ceremony celebrating innovation, awarding outstanding projects, and networking gala with industry partners.',
    highlights: ['Award Presentations', 'Best Project Awards', 'Networking Gala', 'Closing Address'],
    capacity: 1000,
    registrationStatus: 'open',
    registrationLink: 'https://tickets.rextro.lk',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'ai-demo',
    title: 'AI & Computer Vision Demos',
    category: 'interactive',
    day: 3,
    date: '2025-12-07',
    startTime: '10:00',
    endTime: '16:00',
    venue: 'AI Zone - Building A',
    description: 'Live demonstrations of cutting-edge AI and computer vision projects including facial recognition, object detection, and neural networks.',
    highlights: ['Live Demos', 'Project Presentations', 'Q&A Sessions', 'Hands-on Experience'],
    registrationStatus: 'open',
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
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
