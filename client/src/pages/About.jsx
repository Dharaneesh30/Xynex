import React from 'react';
import Card from '../components/common/Card';
import CornerFrame from '../components/common/CornerFrame';
import FloatingLines from '../components/animations/FloatingLines';
import team from '../data/team.json';

// TODO: Replace placeholder team data in data/team.json before public launch

export default function About() {
  const workflow = [
    { step: "01", title: "Consult", desc: "We begin by understanding your space, requirements, and vision." },
    { step: "02", title: "Design", desc: "Our intelligent platform maps your room to exact specifications." },
    { step: "03", title: "Visualize", desc: "See real products placed in your 3D room before making decisions." },
    { step: "04", title: "Deliver", desc: "Instant invoicing and tracked delivery right to your door." }
  ];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative">
      <FloatingLines linesGradient={['#3B82F6', '#8B5CF6', '#A78BFA']} />
      
      {/* Header */}
      <section className="mb-24 max-w-3xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Story</h1>
        <p className="text-xl text-ink-muted leading-relaxed">
          XYNEX was built on a simple premise: designing a space shouldn't require blind faith. 
          We bridge the gap between imagination and reality with intelligent, accessible 3D technology.
        </p>
      </section>

      {/* The Story */}
      <section className="mb-32">
        <CornerFrame className="bg-surface/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/50 shadow-elevated text-ink">
          <h2 className="text-3xl font-display font-bold mb-6 text-ink">Our Story</h2>
          <div className="space-y-4 text-ink-muted leading-relaxed text-lg">
            <p>
              The traditional approach to space planning is broken. People buy furniture based on flat images and rough measurements, only to realize the proportions are entirely wrong once the items arrive.
            </p>
            <p>
              We created XYNEX to solve this. By bringing studio-grade 3D visualization directly to the browser, we empower anyone to build their exact room, drag-and-drop real catalog items, and see exactly what works.
            </p>
          </div>
        </CornerFrame>
      </section>

      {/* Workflow */}
      <section className="mb-32">
        <h2 className="text-3xl font-display font-semibold mb-12 text-center">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {workflow.map((w, i) => (
            <div key={i} className="relative p-6 border-t border-brand-blue/30 pt-8">
              <div className="text-4xl font-mono text-brand-blue/20 mb-4 font-bold">{w.step}</div>
              <h3 className="text-xl font-medium mb-2">{w.title}</h3>
              <p className="text-sm text-ink-muted">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <h2 className="text-3xl font-display font-semibold mb-12 text-center">The Founder</h2>
        <div className="flex justify-center">
          {team.map((member) => (
            <Card key={member.id} className="overflow-hidden group max-w-sm w-full">
              <div className="aspect-[4/5] bg-surface-elevated flex items-center justify-center relative border-b border-ink/5">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="text-ink-muted/30">
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg text-ink">{member.name}</h3>
                <p className="text-brand-blue text-sm mb-4 font-mono">{member.role}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </main>
  );
}
