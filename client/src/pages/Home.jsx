import React from 'react';
import { motion } from 'framer-motion';
import ButterflyIntro from '../components/landing/ButterflyIntro';
import Button from '../components/common/Button';
import WebThreads from '../components/animations/WebThreads';
import { useSessionIntroFlag } from '../hooks/useSessionIntroFlag';

export default function Home() {
  const { showIntro, markIntroSeen } = useSessionIntroFlag();

  const bentoItems = [
    { 
      title: "3D Space Planning", 
      desc: "Drag, drop, and construct real-world rooms with exact dimensions in an intelligent 3D studio.",
      icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    },
    { 
      title: "Real Product Catalog", 
      desc: "Source actual furniture, fixtures, and finishes to place directly into your engineered designs.",
      icon: <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    },
    { 
      title: "Automated GST Invoicing", 
      desc: "Check out seamlessly with instant, compliant tax breakdowns and precise logistical tracking.",
      icon: <polyline points="20 6 9 17 4 12"></polyline>
    },
    { 
      title: "Enterprise Architecture", 
      desc: "Built for scale, ensuring rapid rendering, secure data, and flawless performance on any device.",
      icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    }
  ];

  return (
    <>
      {showIntro && <ButterflyIntro onComplete={markIntroSeen} />}
      
      {!showIntro && (
        <main className="flex-grow flex flex-col w-full relative pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          
          <WebThreads />

          {/* Hero Section */}
          <section className="min-h-[50vh] flex flex-col justify-center items-center text-center mb-32 z-10 pt-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tight mb-8 leading-[1.1] text-ink max-w-[900px]"
            >
              Design, Engineered for Dimensions.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mb-10 leading-relaxed font-body"
            >
              We design and engineer 3D-powered interior planning products, spatial software, and digital experiences built to absolute scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
            >
              <Button to="/universe" variant="primary" size="lg" className="rounded-md w-full sm:w-auto font-semibold">
                Start a Project &rarr;
              </Button>
              <Button to="/about" variant="ghost" size="lg" className="rounded-md w-full sm:w-auto font-semibold border border-ink/10 dark:border-white/10 hover:bg-surface-elevated">
                Explore Our Work
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex flex-wrap gap-8 text-sm font-medium text-ink-muted"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                3D Engineering
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Spatial Software
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Cloud Infrastructure
              </div>
            </motion.div>
          </section>

          {/* Bento Grid Section */}
          <section className="mb-32 z-10">
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4 text-ink">What We Build</h2>
            <p className="text-lg text-ink-muted mb-12 max-w-2xl">From residential mockups to enterprise retail planning, we engineer software that solves real spatial problems.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {bentoItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface dark:bg-surface border border-ink/5 dark:border-white/5 rounded-2xl p-8 hover:bg-surface-elevated transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg border border-ink/10 dark:border-white/10 flex items-center justify-center mb-6 text-brand-blue bg-brand-blue/5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-ink">{item.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

        </main>
      )}
    </>
  );
}
