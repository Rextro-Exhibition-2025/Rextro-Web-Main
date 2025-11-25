import React from 'react';
import { notFound } from 'next/navigation';
import Footer from '@/components/Homepage/Footer';
import DepartmentHero from '@/components/Zones/DepartmentHero';
import ZoneList from '@/components/Zones/ZoneList';
import { departments } from '@/lib/zonesData';

interface PageProps {
  params: Promise<{
    department: string;
  }>;
}

export async function generateStaticParams() {
  return departments.map((dept) => ({
    department: dept.id,
  }));
}

export default async function DepartmentPage({ params }: PageProps) {
  const { department } = await params;
  const deptData = departments.find((d) => d.id === department);

  if (!deptData) {
    notFound();
  }

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      <DepartmentHero 
        title={deptData.name}
        description={deptData.description}
        videoSrc={deptData.videoSrc}
      />
      
      <ZoneList 
        zones={deptData.zones}
        color={deptData.color}
      />

      <Footer />
    </div>
  );
}
