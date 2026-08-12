import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import CornerFrame from '../components/common/CornerFrame';
import GradientWaves from '../components/animations/GradientWaves';
import SplitText from '../components/animations/SplitText';

export default function About() {
  const principles = [
    { title: "THINK BEYOND", desc: "Challenge the boundaries of conventional space." },
    { title: "DESIGN INTELLIGENTLY", desc: "Turn ideas into intentional environments." },
    { title: "EXPERIENCE DIFFERENTLY", desc: "Explore spaces as experiences, not just structures." }
  ];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <GradientWaves className="fixed inset-0 z-[-1]" color1="#050507" color2="#164E63" color3="#06B6D4" color4="#7C3AED" />
      
      {/* Hero Section */}
      <section className="mb-32 max-w-4xl mx-auto text-center flex flex-col items-center pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA] mb-6 uppercase"
        >
          Beyond The Ordinary
        </motion.p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 text-[#F8FAFC] tracking-tight leading-[1.1]">
          <SplitText text="Space Should Be Experienced." />
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl leading-relaxed font-body"
        >
          XYNEX exists where imagination meets intelligent design — creating a new way to think about, shape, and experience space.
        </motion.p>
      </section>

      {/* The Story / Vision */}
      <section className="mb-32 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 text-[#F8FAFC]">
          <SplitText text="Built for Those Who Think Beyond." />
        </h2>
        <div className="text-[#CBD5E1] leading-relaxed text-lg md:text-xl space-y-6 max-w-3xl mx-auto">
          <p>We believe space is more than structure.</p>
          <p className="text-[#A78BFA] font-medium">It is interaction.<br/>It is emotion.<br/>It is possibility.</p>
          <p>XYNEX brings these dimensions together into one immersive design universe.</p>
        </div>
      </section>

      {/* Brand Principles */}
      <section className="mb-32 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border-t border-[#272333] bg-[rgba(13,13,20,0.4)] backdrop-blur-sm rounded-b-2xl hover:bg-[rgba(13,13,20,0.8)] transition-colors duration-300"
            >
              <h3 className="text-lg font-bold mb-4 text-[#F8FAFC] tracking-wider">{p.title}</h3>
              <p className="text-[#CBD5E1] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[rgba(13,13,20,0.5)] backdrop-blur-lg border border-[#272333] rounded-[32px] p-16 md:p-24 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 text-[#F8FAFC]">Different dimensions. One universe.</h2>
          <Button to="/universe" className="!bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none px-10 py-4 rounded font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]">
            Explore XYNEX
          </Button>
        </motion.div>
      </section>

    </main>
  );
}
