export interface Zone {
  id: string;
  name: string;
  description?: string;
  image?: string;
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
      { id: 'control-automation', name: 'Control and Automation Zone', image: '/zone-robotics.png' },
      { id: 'biomedical', name: 'Biomedical Engineering Zone', image: '/zone-innovation.png' },
      { id: 'power-energy', name: 'Power and Energy Systems Zone', image: '/Renewable Energy.png' },
      { id: 'telecom', name: 'Telecommunication & Networking Zone', image: '/zone-ai.png' },
      { id: 'educational-dev', name: 'Educational Development Zone', image: '/zone-gaming.png' },
      { id: 'embedded-systems', name: 'Embedded System Zone', image: '/zone-robotics.png' },
      { id: 'ar-vr', name: 'AR and VR Zone', image: '/AR and VR.png' },
      { id: 'software-cyber', name: 'Software & Cybersecurity Zone', image: '/zone-ai.png' },
      { id: 'ai-vision', name: 'AI and Computer Vision Zone', image: '/AI and Computer Vision.png' },
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
