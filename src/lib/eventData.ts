export interface EventData {
  id: string;
  title: string;
  category: 'competition' | 'webinar' | 'workshop' | 'panel' | 'lecture' | 'interactive' | 'ceremony' | 'zone-session';
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
  registrationLink?: string;
  image?: string;
  color: string;
  gradient: string;
  isAvailable?: boolean; // Toggle to show/hide zone sessions
}

export const events: EventData[] = [
  // Day 1 - December 5, 2025
  {
    id: 'opening-ceremony',
    title: 'Opening Ceremony',
    category: 'ceremony',
    day: 1,
    date: '2025-12-05',
    startTime: '09:00',
    endTime: '11:00',
    venue: 'Auditorium',
    description: 'Grand opening of ReXtro 2025: Silver Jubilee Exhibition celebrating 25 years of engineering excellence and innovation.',
    highlights: ['Welcome Address', 'Keynote Speech', 'Exhibition Overview', 'Industry Partner Introductions'],
    capacity: 500,
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
    startTime: '09:30',
    endTime: '16:30',
    venue: 'NCC',
    description: 'A competitive mathematics quiz designed for top-performing A/L students across the country. Teams compete through multiple rounds of problem-solving, logic-based tasks, and timed challenges.',
    highlights: ['Rapid-fire question rounds', 'Analytical challenges', 'Top student participation'],
    capacity: 80,
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
    registrationLink: 'https://silver-jubilee.eng.ruh.ac.lk/events',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'closing-ceremony',
    title: 'Closing Ceremony',
    category: 'ceremony',
    day: 3,
    date: '2025-12-07',
    startTime: '17:30',
    endTime: '19:30',
    venue: 'Auditorium',
    description: 'Grand closing ceremony celebrating innovation, awarding outstanding projects, and networking with industry partners.',
    highlights: ['Award Presentations', 'Best Project Awards', 'Networking', 'Closing Address'],
    capacity: 400,
    registrationLink: 'https://tickets.rextro.lk',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },

  // Zone Sessions - Set isAvailable to true when ready to publish
  
  // Electrical & Computer Engineering Department Zone Sessions
  {
    id: 'biomedical-research-aspects',
    title: 'Research Aspects of Biomedical Engineering',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '12:00',
    endTime: '13:00',
    venue: 'ELR',
    description: 'Explore the cutting-edge research areas in biomedical engineering and their applications in healthcare and medical technology.',
    highlights: ['Research methodologies', 'Medical technology innovations', 'Healthcare applications'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: true
  },
  {
    id: 'electrical-safety-awareness',
    title: 'Electrical Safety Awareness and Best Practices',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '13:00',
    endTime: '14:00',
    venue: 'ELR',
    description: 'Essential electrical safety guidelines and best practices for general public. Learn how to stay safe around electrical installations.',
    speaker: {
      name: 'Mr. Nadeera Dayananda',
      title: 'Safety Expertise',
      organization: 'Lakvijaya Power Plant, Ceylon Electricity Board'
    },
    highlights: ['Safety protocols', 'Risk prevention', 'Emergency procedures'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'iot-connecting-everything',
    title: 'Internet of Things (IoT): Connecting Everything Around Us',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '11:30',
    endTime: '12:00',
    venue: 'ELR',
    description: 'Discover how IoT is transforming our daily lives by connecting devices and creating smart environments.',
    speaker: {
      name: 'Eng. Hasaranga Vidanapathirana',
      title: 'Engineer',
      organization: ''
    },
    highlights: ['IoT fundamentals', 'Smart devices', 'Connected systems'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'submarine-cables-digital-era',
    title: 'The Unseen Network: How Submarine Cables Shaped the Digital Era',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '13:30',
    endTime: '14:00',
    venue: 'ELR',
    description: 'Explore the fascinating world of submarine cables and their crucial role in global internet connectivity.',
    speaker: {
      name: 'Eng. Nuwan Chamara',
      title: 'Engineer',
      organization: ''
    },
    highlights: ['Submarine cable technology', 'Global connectivity', 'Internet infrastructure'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'diode-rectifier-amplifier-day1',
    title: 'Diode, Rectifier, Amplifier, Transistor - Session 1',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '10:00',
    endTime: '11:00',
    venue: 'ELR',
    description: 'Hands-on educational session on fundamental electronic components for A/L and O/L students.',
    highlights: ['Electronic components', 'Circuit basics', 'Practical demonstrations'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'diode-rectifier-amplifier-day3',
    title: 'Diode, Rectifier, Amplifier, Transistor - Session 2',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '14:30',
    endTime: '15:30',
    venue: 'ELR',
    description: 'Hands-on educational session on fundamental electronic components for A/L and O/L students.',
    highlights: ['Electronic components', 'Circuit basics', 'Practical demonstrations'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'kirchhoff-laws-demo-session1',
    title: 'Kirchhoff\'s Laws Demonstration - Session 1',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '10:00',
    endTime: '11:00',
    venue: 'ELR',
    description: 'Interactive demonstration of Kirchhoff\'s laws with practical circuit examples for students.',
    highlights: ['Circuit analysis', 'Kirchhoff\'s laws', 'Practical applications'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'kirchhoff-laws-demo-session2',
    title: 'Kirchhoff\'s Laws Demonstration - Session 2',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '14:30',
    endTime: '15:30',
    venue: 'ELR',
    description: 'Interactive demonstration of Kirchhoff\'s laws with practical circuit examples for students.',
    highlights: ['Circuit analysis', 'Kirchhoff\'s laws', 'Practical applications'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-metaverse',
    title: 'Introduction to Metaverse',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '12:30',
    endTime: '13:15',
    venue: 'NLH2',
    description: 'Explore the concept of the metaverse and its potential impact on future digital interactions.',
    highlights: ['Metaverse concepts', 'Virtual worlds', 'Future of digital interaction'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-xr-development',
    title: 'Introduction to XR Development',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '12:30',
    endTime: '13:15',
    venue: 'NLH2',
    description: 'Learn about Extended Reality (XR) development covering AR, VR, and MR technologies.',
    highlights: ['XR fundamentals', 'Development tools', 'AR/VR/MR applications'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-frontend-dev',
    title: 'Introduction to Frontend Development',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '11:00',
    endTime: '12:00',
    venue: 'NLH2',
    description: 'Get started with frontend development: HTML, CSS, JavaScript, and modern frameworks.',
    highlights: ['HTML/CSS basics', 'JavaScript fundamentals', 'Modern frameworks'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-backend-dev',
    title: 'Introduction to Backend Development',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '13:30',
    endTime: '14:30',
    venue: 'NLH2',
    description: 'Learn backend development basics: server-side programming, databases, and APIs.',
    highlights: ['Server-side programming', 'Database management', 'API development'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-mobile-dev',
    title: 'Introduction to Mobile Development',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '11:00',
    endTime: '12:00',
    venue: 'NLH2',
    description: 'Discover mobile app development for iOS and Android platforms.',
    highlights: ['Mobile platforms', 'Cross-platform development', 'App design principles'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'intro-ai',
    title: 'Introduction to AI',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '14:30',
    endTime: '15:30',
    venue: 'NLH2',
    description: 'Introduction to Artificial Intelligence: concepts, applications, and future possibilities.',
    highlights: ['AI fundamentals', 'Machine learning basics', 'AI applications'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'prompt-engineering-llm',
    title: 'Prompt Engineering (LLM)',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '11:00',
    endTime: '12:00',
    venue: 'NLH2',
    description: 'Master the art of prompt engineering for Large Language Models to get better AI responses.',
    highlights: ['Prompt design', 'LLM optimization', 'Effective AI communication'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'ai-easy-life',
    title: 'AI for Easy Life (AI Tool Utilisation)',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '14:30',
    endTime: '15:30',
    venue: 'NLH2',
    description: 'Learn how to use AI tools effectively in daily life for productivity and problem-solving.',
    highlights: ['Practical AI tools', 'Productivity hacks', 'Daily life applications'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'ai-everyday-life-day1',
    title: 'AI in Everyday Life & Society - Day 1',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '10:00',
    endTime: '10:30',
    venue: 'NLH2',
    description: 'Explore how AI is transforming our daily lives and society.',
    highlights: ['AI applications', 'Societal impact', 'Future trends'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'ai-everyday-life-day2',
    title: 'AI in Everyday Life & Society - Day 2',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '10:00',
    endTime: '10:30',
    venue: 'NLH2',
    description: 'Explore how AI is transforming our daily lives and society.',
    highlights: ['AI applications', 'Societal impact', 'Future trends'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },
  {
    id: 'ai-everyday-life-day3',
    title: 'AI in Everyday Life & Society - Day 3',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '10:00',
    endTime: '10:30',
    venue: 'NLH2',
    description: 'Explore how AI is transforming our daily lives and society.',
    highlights: ['AI applications', 'Societal impact', 'Future trends'],
    capacity: 60,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    isAvailable: false
  },

  // Mechanical Department Zone Sessions
  {
    id: 'microcontroller-awareness',
    title: 'Microcontroller Awareness Session',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '15:00',
    endTime: '16:00',
    venue: 'MLR',
    description: 'Introduction to microcontrollers and their applications in modern technology.',
    speaker: {
      name: 'Mr. Dayan Marabedda',
      title: 'Head of Engineering',
      organization: 'Hemas Consumer Brands'
    },
    highlights: ['Microcontroller basics', 'Programming fundamentals', 'Real-world applications'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    isAvailable: false
  },
  {
    id: 'industrial-automation-session',
    title: 'Interactive Session about Industrial Automation',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '15:00',
    endTime: '16:00',
    venue: 'MLR',
    description: 'Learn about industrial automation technologies and their impact on modern manufacturing.',
    highlights: ['Automation systems', 'Industry 4.0', 'Smart manufacturing'],
    capacity: 50,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    isAvailable: false
  },
  {
    id: 'motorcycle-engines-exploration',
    title: 'Ride to the Core: A Hands-On Exploration of High-Performance Motorcycle Engines',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'MLR',
    description: 'Deep dive into high-performance motorcycle engine technology with hands-on demonstrations.',
    speaker: {
      name: 'Eng. Praveen & Eng. Roshan',
      title: 'Engineers',
      organization: 'David Pieris Motor Company'
    },
    highlights: ['Engine mechanics', 'Performance optimization', 'Hands-on demonstrations'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    isAvailable: false
  },

  // Marine Department Zone Sessions
  {
    id: 'marine-engineering-uor',
    title: 'Exploring Marine Engineering and Naval Architecture at the University of Ruhuna',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '14:30',
    endTime: '15:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Discover the marine engineering and naval architecture programs at University of Ruhuna.',
    highlights: ['Program overview', 'Career opportunities', 'Research areas'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'ship-engine-room-secrets',
    title: 'Secrets Inside a Ship: What Really Happens in the Engine Room',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '15:30',
    endTime: '16:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Uncover the mysteries of ship engine rooms and marine propulsion systems.',
    highlights: ['Engine room operations', 'Marine machinery', 'Ship systems'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'mega-ships',
    title: 'Mega Ships: The Largest and Most Powerful Machines on the Ocean',
    category: 'zone-session',
    day: 1,
    date: '2025-12-05',
    startTime: '16:30',
    endTime: '17:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Explore the engineering marvels of the world\'s largest ships.',
    highlights: ['Ship design', 'Propulsion systems', 'Naval architecture'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'life-at-sea',
    title: 'Life at Sea: True Stories from Engineers Who Travel the World',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '10:30',
    endTime: '11:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Hear firsthand experiences from marine engineers about life aboard ships.',
    highlights: ['Career insights', 'Travel experiences', 'Marine engineering life'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'future-ship-design',
    title: 'Future of Ship Design: Trends in Naval Architecture',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '14:30',
    endTime: '15:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Explore emerging trends and innovations in naval architecture and ship design.',
    highlights: ['Design innovations', 'Future technologies', 'Sustainability'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'green-shipping',
    title: 'Green Shipping: Innovations in Sustainable Ship Design and Marine Renewable Energy',
    category: 'zone-session',
    day: 2,
    date: '2025-12-06',
    startTime: '15:30',
    endTime: '16:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Learn about sustainable shipping technologies and marine renewable energy solutions.',
    highlights: ['Sustainable design', 'Renewable energy', 'Environmental impact'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'ship-accidents-science',
    title: 'The Science of Ship Accidents: Why Ships Sink and How Engineers Prevent It',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '10:30',
    endTime: '11:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Understand ship accidents and the engineering solutions to prevent them.',
    highlights: ['Safety engineering', 'Accident analysis', 'Prevention methods'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'marine-engineering-advancements',
    title: 'Advancements in Marine Engineering: Navigating the Future',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '14:30',
    endTime: '15:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Discover the latest advancements in marine engineering technology.',
    highlights: ['New technologies', 'Innovation trends', 'Future outlook'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
  },
  {
    id: 'becoming-chief-engineer',
    title: 'Pathways to Becoming a Chief Engineer: Insights and Advice',
    category: 'zone-session',
    day: 3,
    date: '2025-12-07',
    startTime: '15:30',
    endTime: '16:00',
    venue: 'New Workshop Upper Floor Lecture Room',
    description: 'Career guidance and insights on becoming a Chief Marine Engineer.',
    highlights: ['Career path', 'Professional development', 'Industry insights'],
    capacity: 40,
    registrationLink: 'https://forms.gle/aEQJi6Vujufb2DAD6',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    isAvailable: false
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
    ceremony: 'Ceremony',
    'zone-session': 'Zone Session',
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
    ceremony: '🎖️',
    'zone-session': '🎓',
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

export const getAvailableEvents = (): EventData[] => {
  return events.filter(event => event.isAvailable !== false);
};

export const getAvailableEventsByDay = (day: 1 | 2 | 3): EventData[] => {
  return events.filter(event => event.day === day && event.isAvailable !== false).sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
};
