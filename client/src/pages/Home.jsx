import React from 'react';
import { motion } from 'framer-motion';
import ButterflyIntro from '../components/landing/ButterflyIntro';
import Button from '../components/common/Button';
import MoltenMetal from '../components/animations/MoltenMetal';
import ShinyText from '../components/animations/ShinyText';
import { useSessionIntroFlag } from '../hooks/useSessionIntroFlag';

export default function Home() {
  const { showIntro, markIntroSeen } = useSessionIntroFlag();

  const brandCards = [
    { title: "IMAGINE", desc: "Start with an idea." },
    { title: "CREATE", desc: "Shape every dimension." },
    { title: "EXPERIENCE", desc: "Step inside what you imagined." }
  ];

  return (
    <>
      {showIntro && <ButterflyIntro onComplete={markIntroSeen} />}
      
      {!showIntro && (
        <main className="flex-grow flex flex-col w-full relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
          
          <MoltenMetal className="fixed inset-0 z-[-1]" opacity={0.6} />

          {/* Hero Section */}
          <section className="min-h-[60vh] flex flex-col justify-center items-center text-center mb-32 z-10 pt-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs font-semibold tracking-[0.2em] text-[#22D3EE] mb-6 uppercase"
            >
              The Future of Spatial Design
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 leading-[1.1]"
            >
              <ShinyText text="Design Beyond Dimensions." />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl mb-10 leading-relaxed font-body"
            >
              Transform ideas into intelligent spaces, immersive environments, and experiences built beyond the limits of imagination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
            >
              <Button to="/universe" variant="primary" size="lg" className="rounded-md w-full sm:w-auto font-semibold">
                Enter Universe
              </Button>
              <Button to="/universe/showcase" variant="ghost" size="lg" className="rounded-md w-full sm:w-auto font-semibold border border-[#272333] hover:bg-[rgba(255,255,255,0.05)] text-[#CBD5E1] hover:text-[#F8FAFC]">
                Explore Showcase
              </Button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 text-sm font-medium text-[#94A3B8]"
            >
              Imagine it. <span className="text-[#A78BFA] mx-2">&bull;</span> Shape it. <span className="text-[#A78BFA] mx-2">&bull;</span> Experience it.
            </motion.p>
          </section>

          {/* Feature Section */}
          <section className="mb-32 z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6 text-[#F8FAFC]">Where Imagination Takes Form.</h2>
            <p className="text-lg text-[#CBD5E1] mb-16 max-w-2xl mx-auto">From a single idea to an entire environment, XYNEX turns spatial concepts into experiences you can explore.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {brandCards.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[rgba(13,13,20,0.65)] backdrop-blur-md border border-[#272333] rounded-2xl p-10 hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold mb-3 text-[#F8FAFC] tracking-wide group-hover:text-[#A78BFA] transition-colors">{item.title}</h3>
                  <p className="text-[#CBD5E1] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center z-10 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[rgba(13,13,20,0.5)] backdrop-blur-lg border border-[#272333] rounded-[32px] p-16 md:p-24"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 text-[#F8FAFC]">Your next dimension is waiting.</h2>
              <Button to="/universe" className="!bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none px-10 py-4 rounded font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]">
                Enter XYNEX
              </Button>
            </motion.div>
          </section>

        </main>
      )}
    </>
  );
}
