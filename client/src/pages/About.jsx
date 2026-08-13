import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import GradientWaves from '../components/animations/GradientWaves';
import SplitText from '../components/animations/SplitText';
import BlurReveal from '../components/animations/BlurReveal';
import SpotlightCard from '../components/animations/SpotlightCard';

export default function About() {
  const principles = [
    { title: "IMAGINE", desc: "Start with possibilities, not limitations." },
    { title: "CREATE", desc: "Turn ideas into spaces that can be shaped and explored." },
    { title: "EXPERIENCE", desc: "Go beyond looking at a design. Experience it." }
  ];

  const ecosystem = [
    { title: "BUILD", desc: "Create spaces from your imagination.", cta: "Start Building", link: "/universe/build" },
    { title: "SHOWCASE", desc: "Explore spaces created within the XYNEX universe.", cta: "Explore Showcase", link: "/universe/showcase" },
    { title: "DESIGN STUDIO", desc: "Experiment, refine, and shape your ideas in an immersive design environment.", cta: "Enter Studio", link: "/universe/design" }
  ];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <GradientWaves className="fixed inset-0 z-[-1] pointer-events-none" color1="#050507" color2="#164E63" color3="#06B6D4" color4="#7C3AED" />
      
      {/* Hero Section */}
      <section className="mb-32 max-w-4xl mx-auto text-center flex flex-col items-center pt-10">
        <BlurReveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA] mb-6 uppercase">
            ABOUT XYNEX
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 text-[#F8FAFC] tracking-tight leading-[1.1]">
            <SplitText text="Design Beyond Dimensions." />
          </h1>
          <p className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl leading-relaxed font-body mb-6 mx-auto">
            XYNEX is an evolving digital universe built around the idea that spaces should not be limited by the boundaries of conventional design.
          </p>
          <p className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl leading-relaxed font-body mb-12 mx-auto">
            We are exploring a future where imagination, technology, and spatial design come together to create experiences that can be imagined, shaped, explored, and experienced differently.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
            <Button to="/universe" variant="primary" size="lg" className="rounded-md w-full sm:w-auto font-semibold !bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none">
              Explore the Universe
            </Button>
            <Button to="/universe/build" variant="ghost" size="lg" className="rounded-md w-full sm:w-auto font-semibold border border-[#272333] hover:bg-[rgba(255,255,255,0.05)] text-[#CBD5E1] hover:text-[#F8FAFC]">
              Start Building
            </Button>
          </div>
        </BlurReveal>
      </section>

      {/* Why XYNEX */}
      <section className="mb-32 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 text-[#F8FAFC]">
          Why XYNEX?
        </h2>
        <div className="text-[#CBD5E1] leading-relaxed text-lg md:text-xl space-y-6 max-w-3xl mx-auto">
          <p>
            Design has always been about more than walls, structures, and dimensions.
          </p>
          <p className="text-[#A78BFA] font-medium">
            It is about how a space feels.<br/>
            How people interact with it.<br/>
            How ideas take shape inside it.
          </p>
          <p>
            XYNEX was created around a simple belief:
          </p>
          <p className="text-[#F8FAFC] font-semibold tracking-wide">
            Space should not only be designed. It should be experienced.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mb-32 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-[#F8FAFC]">
          Beyond the Blueprint.
        </h2>
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto mb-16">
          XYNEX aims to create a new way of thinking about space — combining creativity, technology, visualization, and immersive interaction into one connected ecosystem.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {principles.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-[#272333] bg-[rgba(13,13,20,0.4)] backdrop-blur-sm rounded-2xl hover:border-[#7C3AED] transition-colors duration-300"
            >
              <h3 className="text-lg font-bold mb-4 text-[#F8FAFC] tracking-wider uppercase text-[#06B6D4]">{p.title}</h3>
              <p className="text-[#CBD5E1] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Xynex Ecosystem */}
      <section className="mb-32 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-[#F8FAFC]">
          One Universe. Multiple Dimensions.
        </h2>
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto mb-16">
          XYNEX brings creation, exploration, and experimentation together in one ecosystem.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left flex-col items-stretch">
          {ecosystem.map((sys, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-8 border border-[#272333] bg-[rgba(13,13,20,0.6)] backdrop-blur-md rounded-2xl flex flex-col items-start group">
                <h3 className="text-xl font-bold mb-4 text-[#F8FAFC]">{sys.title}</h3>
                <p className="text-[#CBD5E1] leading-relaxed mb-8 flex-grow">{sys.desc}</p>
                <Button to={sys.link} variant="outline" className="w-full !border-[#272333] group-hover:!border-[#7C3AED] text-[#CBD5E1] group-hover:text-[#F8FAFC] transition-colors">
                  {sys.cta}
                </Button>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="mb-32 max-w-5xl mx-auto bg-[rgba(13,13,20,0.5)] backdrop-blur-lg border border-[#272333] rounded-[32px] p-8 md:p-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Image */}
          <div className="w-full md:w-[40%] flex justify-center">
            <div className="relative group rounded-3xl overflow-hidden border border-[#272333] hover:border-[#7C3AED] transition-colors duration-500 shadow-[0_0_20px_rgba(124,58,237,0.05)] hover:shadow-[0_0_40px_rgba(124,58,237,0.20)]">
              <img 
                src="/assets/about/founder.jpg" 
                alt="Dharaneesh N - Founder & CEO"
                className="w-full max-w-[320px] aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-[60%] flex flex-col justify-center h-full">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#06B6D4] mb-4 uppercase">
              THE PERSON BEHIND XYNEX
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-[#F8FAFC] mb-2">
              Dharaneesh N
            </h2>
            <p className="text-lg text-[#A78BFA] font-medium mb-8">
              Founder & CEO
            </p>
            
            <div className="text-[#CBD5E1] space-y-4 leading-relaxed text-lg mb-10">
              <p>
                XYNEX was founded with the idea of exploring what happens when technology and imagination are given more room to interact.
              </p>
              <p>
                As the Founder and CEO of XYNEX, Dharaneesh is focused on building a platform that brings spatial creativity, digital experiences, and emerging technology together into one evolving universe.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-6 items-center">
              <a href="https://linkedin.com/in/dharaneesh30" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors font-medium">LinkedIn</a>
              <span className="text-[#272333]">•</span>
              <a href="https://github.com/Dharaneesh30" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors font-medium">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[#F8FAFC]">There's More Beyond the Visible.</h2>
          <p className="text-[#94A3B8] text-xl mb-12">XYNEX is only the beginning.</p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
            <Button to="/universe" className="!bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none px-10 py-4 rounded font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]">
              Enter the Universe
            </Button>
            <Button to="/contact" variant="ghost" className="px-10 py-4 rounded font-semibold border border-[#272333] text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.05)] transition-all">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
