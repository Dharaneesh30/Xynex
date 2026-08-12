import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import GridMotion from '../../components/animations/GridMotion';
import SpotlightCard from '../../components/animations/SpotlightCard';
import BlurReveal from '../../components/animations/BlurReveal';

export default function Build() {
  const buildOptions = [
    { title: "Design a Room.", desc: "Create a space designed around the way you live, work, and experience.", cta: "Build a Room", link: "/universe/design" },
    { title: "Build a Hub.", desc: "Create a larger environment where spaces, people, and ideas come together.", cta: "Build a Hub", link: "/universe/design" },
    { title: "Enter Design Studio.", desc: "Take complete control and experiment with space in an immersive design environment.", cta: "Open Studio", link: "/universe/design" }
  ];

  const processSteps = [
    { step: "01", title: "IMAGINE", desc: "Start with what you see in your mind." },
    { step: "02", title: "DEFINE", desc: "Give your idea structure and purpose." },
    { step: "03", title: "BUILD", desc: "Shape the space around your vision." },
    { step: "04", title: "EXPERIENCE", desc: "Step into what you created." }
  ];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="fixed inset-0 z-[-1] bg-[#020204] pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <GridMotion gradientColor="#111827" />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center mb-32 z-10 pt-10">
        <BlurReveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#06B6D4] mb-6 uppercase">
            ENTER THE UNIVERSE
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium mb-8 text-[#F8FAFC] tracking-tight leading-[1.1]">
            Build Your Dimension.
          </h1>
          <p className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl mx-auto mb-12 leading-relaxed font-body">
            Turn an idea into a space you can see, shape, and experience.
          </p>
        </BlurReveal>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
        >
          <Button to="/universe/design" variant="primary" size="lg" className="rounded-md w-full sm:w-auto font-semibold !bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none">
            Start Building
          </Button>
          <Button to="/universe/showcase" variant="ghost" size="lg" className="rounded-md w-full sm:w-auto font-semibold border border-[#272333] hover:bg-[rgba(255,255,255,0.05)] text-[#CBD5E1] hover:text-[#F8FAFC]">
            Explore Showcase
          </Button>
        </motion.div>
      </section>

      {/* Build Intro */}
      <section className="mb-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F8FAFC] mb-4">Start With an Idea.</h2>
        <p className="text-[#94A3B8] text-lg">Choose a space, define its character, and begin shaping something uniquely yours.</p>
      </section>

      {/* Build Options */}
      <section className="mb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {buildOptions.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-[#272333] bg-[rgba(13,13,20,0.7)] backdrop-blur-md hover:border-[#7C3AED] transition-all duration-300 flex flex-col group">
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-[#F8FAFC]">{card.title}</h3>
                  <p className="text-[#CBD5E1] leading-relaxed text-sm mb-8 flex-grow">{card.desc}</p>
                  <Button to={card.link} variant="outline" className="w-full !border-[#312E81] group-hover:!border-[#7C3AED] text-[#CBD5E1] group-hover:text-[#F8FAFC] transition-colors">
                    {card.cta}
                  </Button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Build Process */}
      <section className="mb-32 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left relative"
            >
              <div className="text-[#312E81] font-mono text-4xl font-bold mb-4 opacity-50">{step.step}</div>
              <h4 className="text-[#F8FAFC] font-semibold tracking-wider mb-2">{step.title}</h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
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
          className="bg-[rgba(13,13,20,0.5)] backdrop-blur-xl border border-[#272333] rounded-[32px] p-16 md:p-24 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-[#F8FAFC]">Your dimension starts here.</h2>
          <p className="text-[#94A3B8] text-lg mb-10">Nothing exists until someone imagines it.</p>
          <Button to="/universe/design" className="!bg-[#06B6D4] hover:!bg-[#22D3EE] !text-[#050507] !border-none px-10 py-4 rounded font-semibold text-lg transition-all duration-300">
            Start Building
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
