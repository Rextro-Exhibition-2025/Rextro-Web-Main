export interface Zone {
  id: string;
  name: string;
  description?: string;
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
      { id: 'control-automation', name: 'Control and Automation Zone' },
      { id: 'biomedical', name: 'Biomedical Engineering Zone' },
      { id: 'power-energy', name: 'Power and Energy Systems Zone' },
      { id: 'telecom', name: 'Telecommunication & Networking Zone' },
      { id: 'educational-dev', name: 'Educational Development Zone' },
      { id: 'embedded-systems', name: 'Embedded System Zone' },
      { id: 'ar-vr', name: 'AR and VR Zone' },
      { id: 'software-cyber', name: 'Software & Cybersecurity Zone' },
      { id: 'ai-vision', name: 'AI and Computer Vision Zone' },
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
      { id: 'robotics', name: 'Robotics & Intelligent Automation Zone' },
      { id: 'sustainable-energy', name: 'Sustainable & Renewable Energy Technologies Zone' },
      { id: 'education-skills', name: 'Education & Skills Development Zone' },
      { id: 'product-design', name: 'Product Design & Rapid Prototyping Zone' },
      { id: 'drone-uav', name: 'Drone & UAV Technologies Zone' },
      { id: 'automotive', name: 'Automotive Engineering & Mobility Solutions Zone' },
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
      { id: 'marine-eng', name: 'Marine Engineering & Naval Architecture Zone' },
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
      { id: 'environmental', name: 'Environmental Engineering Zone' },
      { id: 'structural', name: 'Structural Engineering Zone' },
      { id: 'transportation', name: 'Transportation & Construction Management Zone' },
      { id: 'geotechnical', name: 'Geotechnical Engineering Zone' },
      { id: 'water-resources', name: 'Water Resources Engineering Zone' },
      { id: 'building-materials', name: 'Building Materials Zone' },
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
      { id: 'is-zone', name: 'IS Zone' },
      { id: 'space', name: 'Space Zone' },
      { id: 'triforces', name: 'Triforces Zones' },
    ]
  },
];
