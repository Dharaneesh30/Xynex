import React from 'react';
import { motion } from 'framer-motion';
import ButterflyIntro from '../components/landing/ButterflyIntro';
import CornerFrame from '../components/common/CornerFrame';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useSessionIntroFlag } from '../hooks/useSessionIntroFlag';
import reviews from '../data/reviews.json';

// TODO: Replace placeholder reviews in data/reviews.json before public launch

export default function Home() {
  const { showIntro, markIntroSeen } = useSessionIntroFlag();

  const features = [
    { title: "3D Room Designer", desc: "Build your exact space with adjustable dimensions and real-time visualization." },
    { title: "Real Product Catalog", desc: "Place genuine furniture and decor items directly into your 3D layout." },
    { title: "Instant GST Invoice", desc: "Get an accurate breakdown of costs and taxes the moment you check out." },
    { title: "Order Tracking", desc: "Follow your project's journey from design review to final delivery." }
  ];

  return (
    <>
      {showIntro && <ButterflyIntro onComplete={markIntroSeen} />}
      
      {!showIntro && (
        <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-24">
            <CornerFrame className="max-w-4xl mx-auto p-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-display font-bold tracking-wide mb-6"
              >
                <span className="text-ink">DESIGN BEYOND </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">DIMENSIONS</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10"
              >
                The intelligent space-planning platform that turns imagination into exact specifications. 
                Build your room, place real products, and visualize your future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button to="/universe" variant="gradient" size="lg">
                  Enter Xynex Universe
                </Button>
              </motion.div>
            </CornerFrame>
          </section>

          {/* The Idea Section */}
          <section className="mb-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">The intersection of ideas and spaces.</h2>
              <p className="text-ink-muted mb-4 leading-relaxed">
                We believe that designing a room shouldn't require guessing. XYNEX solves the space-planning problem by bringing a studio-grade 3D designer directly to your browser.
              </p>
              <p className="text-ink-muted leading-relaxed">
                Whether you're moving into a new home or redesigning an office, you can finally see exactly how things fit before making a commitment.
              </p>
            </div>
            <div className="bg-surface-elevated rounded-lg aspect-video flex items-center justify-center border border-ink/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-violet/10"></div>
              <svg className="w-24 h-24 text-brand-blue/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
          </section>

          {/* How it Works Sequence */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">How it works</h2>
              <p className="text-ink-muted">A seamless journey from imagination to reality.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Browse", desc: "Explore our catalog of real furniture and decor items." },
                { step: "02", title: "Design in 3D", desc: "Drag and drop items into a room built to your exact dimensions." },
                { step: "03", title: "Instant Invoice", desc: "Checkout to generate an accurate GST invoice immediately." },
                { step: "04", title: "Track Order", desc: "Follow your items from our warehouse to your front door." }
              ].map((s, i) => (
                <Card key={i} className="p-6 relative group" hoverable>
                  <div className="text-5xl font-mono font-bold text-ink/5 mb-4 group-hover:text-brand-blue/10 transition-colors">{s.step}</div>
                  <h3 className="text-xl font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-muted">{s.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="mb-32">
            <CornerFrame className="bg-surface p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-semibold">Engineered for precision</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <svg className="w-6 h-6 text-brand-violet-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{f.title}</h4>
                      <p className="text-sm text-ink-muted">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CornerFrame>
          </section>

          {/* Testimonials */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">What people are saying</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <Card key={r.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(r.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      ))}
                    </div>
                    <p className="text-ink-muted italic mb-6">"{r.quote}"</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{r.name}</p>
                    <p className="text-xs text-ink-muted/50 uppercase tracking-wide">{r.location}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
        </main>
      )}
    </>
  );
}
