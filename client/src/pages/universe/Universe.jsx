import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import Starfield from '../../components/animations/Starfield';
import SpotlightCard from '../../components/animations/SpotlightCard';
import BlurReveal from '../../components/animations/BlurReveal';

export default function Universe() {
  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10 min-h-[90vh] flex flex-col justify-center">
      <div className="fixed inset-0 z-[-1] bg-[#030305]">
        <Starfield speed={0.8} color="#E0E7FF" className="opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_70%)] pointer-events-none" />
      </div>
      
      <BlurReveal className="text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA] mb-4 uppercase">
          Welcome to the
        </p>
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 text-[#F8FAFC] tracking-tight">
          Xynex Universe.
        </h1>
        <p className="text-lg md:text-xl text-[#CBD5E1] max-w-2xl mx-auto">
          Choose your path. Will you shape a new reality or explore what has already been imagined?
        </p>
      </BlurReveal>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-full"
        >
          <SpotlightCard className="h-full rounded-3xl border border-[#272333] bg-[rgba(13,13,20,0.6)] backdrop-blur-xl hover:border-[#7C3AED] transition-all duration-500 flex flex-col group p-10 md:p-12 text-center items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[rgba(124,58,237,0.1)] border border-[#7C3AED] flex items-center justify-center mb-8 text-[#A78BFA] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 text-[#F8FAFC]">Build Your Dimension</h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-10 max-w-sm">
              Enter the creative studio. Shape rooms, hubs, and environments that exist beyond physical boundaries.
            </p>
            <Button to="/universe/build" variant="primary" className="!bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none px-8 py-3 rounded-lg font-semibold w-full sm:w-auto">
              Enter Studio
            </Button>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-full"
        >
          <SpotlightCard className="h-full rounded-3xl border border-[#272333] bg-[rgba(13,13,20,0.6)] backdrop-blur-xl hover:border-[#06B6D4] transition-all duration-500 flex flex-col group p-10 md:p-12 text-center items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[rgba(6,182,212,0.1)] border border-[#06B6D4] flex items-center justify-center mb-8 text-[#22D3EE] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 text-[#F8FAFC]">Explore Others</h2>
            <p className="text-[#CBD5E1] leading-relaxed mb-10 max-w-sm">
              Discover spaces, ideas, and experiences created by the community. See what imagination looks like.
            </p>
            <Button to="/universe/showcase" variant="outline" className="!border-[#272333] group-hover:!border-[#06B6D4] text-[#CBD5E1] hover:text-[#F8FAFC] px-8 py-3 rounded-lg font-semibold w-full sm:w-auto transition-all">
              Explore Designs
            </Button>
          </SpotlightCard>
        </motion.div>
      </div>
    </main>
  );
}
