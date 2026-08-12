import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ButterflyIntro from '../components/landing/ButterflyIntro';
import CornerFrame from '../components/common/CornerFrame';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LiveHeroBackground from '../components/landing/LiveHeroBackground';
import { useSessionIntroFlag } from '../hooks/useSessionIntroFlag';

export default function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/reviews`);
        const data = await res.json();
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };
    fetchReviews();
  }, []);
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
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-24 relative overflow-hidden rounded-3xl border border-ink/10">
            <div className="absolute inset-0 bg-bg-base/40 z-10"></div>
            <LiveHeroBackground />
            <CornerFrame className="max-w-4xl mx-auto p-12 z-20 relative">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-display font-bold tracking-wide mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ink-muted">DESIGN BEYOND </span>
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
            <div className="bg-surface/50 backdrop-blur-xl rounded-3xl aspect-video flex items-center justify-center border border-white/50 shadow-elevated relative overflow-hidden p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-brand-violet/5 pointer-events-none z-10 mix-blend-overlay"></div>
                <img src="/assets/home-how-it-works.png" alt="How it works blueprint" className="w-full h-full object-cover rounded-2xl" />
              </div>
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
                  <div className="text-5xl font-mono font-bold text-brand-blue/15 mb-4 group-hover:text-brand-blue/30 transition-colors">{s.step}</div>
                  <h3 className="text-xl font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-muted">{s.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="mb-32">
            <CornerFrame className="bg-surface/80 backdrop-blur-2xl p-12 border border-white/40 shadow-elevated rounded-[2rem]">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-semibold">Engineered for precision</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 transition-transform group-hover:scale-110 group-hover:text-brand-blue duration-300">
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
                <Card key={r._id || r.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      ))}
                    </div>
                    <p className="text-ink-muted italic mb-6">"{r.text || r.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-ink/10" />
                    <div>
                      <p className="font-medium text-sm">{r.name}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-20 relative overflow-hidden rounded-[2rem] border border-white/50 shadow-elevated flex items-center justify-center text-center p-24 bg-surface/60 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-violet/10 z-10 pointer-events-none"></div>
            <img src="/assets/home-cta-background.png" alt="CTA Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-overlay" />
            <div className="z-20 relative max-w-2xl text-ink">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">Ready to design your perfect space?</h2>
              <p className="text-lg text-ink-muted mb-10">Join thousands of users who have already transformed their rooms using XYNEX.</p>
              <Button to="/universe" variant="gradient" size="lg">
                Start Creating Now
              </Button>
            </div>
          </section>
          
        </main>
      )}
    </>
  );
}
