export interface Zone {
  id: string;
  name: string;
  description?: string;
  image?: string;
  location?: string;
  highLevelLocation?: string;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  videoSrc: string;
  color: string;
  zones: Zone[];
}

export const departments: Department[] = [
  {
    id: 'electrical',
    name: 'Electrical & Information Engineering',
    shortName: 'Electrical',
    description: 'Powering the future with smart grids, AI, and telecommunications.',
    videoSrc: '/zones/videos/Ai.mp4',
    color: '#3b82f6', // Blue
    zones: [
      { 
        id: 'control-automation', 
        name: 'Control and Automation Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-robotics.png',
        location: 'Electrical machines',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'power-energy', 
        name: 'Power and Energy Systems Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/Renewable Energy.png',
        location: 'Power Systems',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'biomedical', 
        name: 'Biomedical Engineering Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-innovation.png',
        location: 'HPC Lab and TO Room',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'telecom', 
        name: 'Telecommunication Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-ai.png',
        location: 'Communication systems',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'educational-dev', 
        name: 'Educational Development Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-gaming.png',
        location: 'Electronics and Measurements',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'embedded-systems', 
        name: 'Embedded System Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-robotics.png',
        location: 'Project development',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'cybersecurity', 
        name: 'Cybersecurity & Networking Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-ai.png',
        location: 'Computer Lab',
        highLevelLocation: 'DEIE'
      },
      { 
        id: 'ar-vr', 
        name: 'AR and VR Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/AR and VR.png',
        location: 'NLH3',
        highLevelLocation: 'Auditorium Building'
      },
      { 
        id: 'software-eng', 
        name: 'Software Engineering Zone', 
        description: 'Explore the cutting-edge innovations in this zone, showcasing the latest advancements in technology and engineering. Students and researchers have collaborated to bring these projects to life, demonstrating practical applications of theoretical concepts. Discover how these developments are shaping the future of the industry and solving real-world problems through creative solutions.',
        image: '/zone-ai.png',
        location: 'NLH1',
        highLevelLocation: 'Auditorium Building'
      },
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical & Manufacturing Engineering',
    shortName: 'Mechanical',
    description: 'Innovating with robotics, sustainable energy, and automotive tech.',
    videoSrc: '/zones/videos/robotics.mp4',
    color: '#eab308', // Yellow
    zones: [
      { id: 'robotics', name: 'Robotics & Intelligent Automation Zone', image: '/Robotics.png' },
      { id: 'sustainable-energy', name: 'Sustainable & Renewable Energy Technologies Zone', image: '/Renewable Energy.png' },
      { id: 'education-skills', name: 'Education & Skills Development Zone', image: '/zone-innovation.png' },
      { id: 'product-design', name: 'Product Design & Rapid Prototyping Zone', image: '/zone-gaming.png' },
      { id: 'drone-uav', name: 'Drone & UAV Technologies Zone', image: '/zone-robotics.png' },
      { id: 'automotive', name: 'Automotive Engineering & Mobility Solutions Zone', image: '/zone-ai.png' },
    ]
  },
  {
    id: 'marine',
    name: 'Marine Engineering & Naval Architecture',
    shortName: 'Marine',
    description: 'Navigating the seas with advanced marine technology.',
    videoSrc: '/zones/videos/Marine_reduced.mp4',
    color: '#f43f5e', // Rose/Red
    zones: [
      { id: 'marine-eng', name: 'Marine Engineering & Naval Architecture Zone', image: '/zone-innovation.png' },
    ]
  },
  {
    id: 'civil',
    name: 'Civil & Environmental Engineering',
    shortName: 'Civil',
    description: 'Building a sustainable world with structural and environmental solutions.',
    videoSrc: '/zones/videos/Sustainable.mp4',
    color: '#0ea5e9', // Sky Blue
    zones: [
      { id: 'environmental', name: 'Environmental Engineering Zone', image: '/zone-innovation.png' },
      { id: 'structural', name: 'Structural Engineering Zone', image: '/zone-robotics.png' },
      { id: 'transportation', name: 'Transportation & Construction Management Zone', image: '/zone-ai.png' },
      { id: 'geotechnical', name: 'Geotechnical Engineering Zone', image: '/zone-gaming.png' },
      { id: 'water-resources', name: 'Water Resources Engineering Zone', image: '/Renewable Energy.png' },
      { id: 'building-materials', name: 'Building Materials Zone', image: '/zone-innovation.png' },
    ]
  },
  {
    id: 'is',
    name: 'Interdisciplinary Studies',
    shortName: 'IS',
    description: 'Exploring the frontiers of space and defense technology.',
    videoSrc: '/zones/videos/1 1 Space Zone_reduced.mp4',
    color: '#d946ef', // Fuchsia
    zones: [
      { id: 'is-zone', name: 'IS Zone', image: '/zone-ai.png' },
      { id: 'space', name: 'Space Zone', image: '/zone-robotics.png' },
      { id: 'triforces', name: 'Triforces Zones', image: '/zone-gaming.png' },
    ]
  },
];
