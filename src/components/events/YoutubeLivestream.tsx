import React from 'react';
import AnimatedBackground from '@/components/common/AnimatedBackground';

const YoutubeLivestream = () => {
    return (
        <section className="relative w-full px-4 sm:px-8 lg:px-20 -mt-20 z-20 pb-20">
             {/* Animated Background for the dark section - copying map page style */}
             {/* Note: Map page puts AnimatedBackground on the section. We might need to adjust based on where this sits in events page. 
                 Since Events page alternates light/dark, and this is likely "dark" styled box, let's keep it self-contained or rely on parent.
                 Map page uses a black bg wrapper. The events page hero is light, then schedule is dark. 
                 The request says "displayed on the event page after the event is started". 
                 It likely fits best AT THE TOP of the schedule or BETWEEN hero and schedule.
                 If between, we need a dark section.
             */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/nohz2t5FziY" 
                        title="ReXtro 2025 Livestream" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default YoutubeLivestream;
