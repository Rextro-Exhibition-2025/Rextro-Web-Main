"use client";

import React from 'react';
import ZoneHighlightCard from './ZoneHighlightCard';

const zones = [
  {
    title: 'Robotics Arena',
    description: 'Witness the future of automation with battle bots, industrial arms, and humanoid robots. Experience live demonstrations and interactive control sessions.',
    imageSrc: '/zone-robotics.png',
    color: '#06b6d4', // Cyan
    features: ['Battle Bots', 'Industrial Automation', 'Humanoid Demos', 'Drone Racing'],
  },
  {
    title: 'AI & Data Center',
    description: 'Explore the neural networks powering tomorrow. See real-time data visualization, machine learning models in action, and generative AI exhibits.',
    imageSrc: '/zone-ai.png',
    color: '#8b5cf6', // Violet
    features: ['Neural Networks', 'Generative AI', 'Big Data Viz', 'Smart Systems'],
  },
  {
    title: 'Gaming Zone',
    description: 'Immerse yourself in the ultimate gaming experience. From retro arcades to VR simulations and competitive esports tournaments.',
    imageSrc: '/zone-gaming.png',
    color: '#ef4444', // Red
    features: ['Esports Stage', 'VR Experience', 'Retro Arcade', 'Game Dev Lab'],
  },
  {
    title: 'Innovation Lab',
    description: 'Where ideas come to life. See 3D printing in action, sustainable tech prototypes, and student inventions solving real-world problems.',
    imageSrc: '/zone-innovation.png',
    color: '#10b981', // Emerald
    features: ['3D Printing', 'Green Tech', 'Student Projects', 'Fab Lab'],
  },
];

const ZoneGallery = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Zones</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover the key areas of the exhibition, each designed to showcase specific aspects of engineering and technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {zones.map((zone, idx) => (
            <ZoneHighlightCard
              key={idx}
              {...zone}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZoneGallery;
