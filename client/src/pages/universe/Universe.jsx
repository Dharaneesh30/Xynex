import CornerFrame from '../../components/common/CornerFrame';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ScrollExpand from '../../components/animations/ScrollExpand';
import Starfield from '../../components/animations/Starfield';

export default function Universe() {
  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative">
      <Starfield speed={1.2} />
      <section className="min-h-[60vh] flex flex-col md:flex-row items-center gap-12 mb-20 z-10 relative">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Xynex Universe</h1>
          <p className="text-xl text-ink-muted mb-8 max-w-lg leading-relaxed">
            Your centralized hub for space planning. Explore curated designs for inspiration or launch the Design Studio to build from scratch.
          </p>
          <div className="flex gap-4">
            <Button to="/universe/design" variant="primary" size="lg">Open Design Studio</Button>
            <Button to="/universe/showcase" variant="secondary" size="lg">View Showcase</Button>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <CornerFrame className="aspect-square bg-surface border border-ink/5 flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <img src="/assets/universe-hero.png" alt="3D Design Studio Concept" className="w-full h-full object-cover rounded-xl" />
            </div>
          </CornerFrame>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <Card hoverable className="p-8 group cursor-pointer" onClick={() => window.location.href='/universe/showcase'}>
          <div className="w-12 h-12 rounded-full bg-brand-violet/10 text-brand-violet-light flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-brand-blue transition-colors">Showcase</h3>
          <p className="text-ink-muted">
            Browse our gallery of curated interior designs. Discover layouts that maximize productivity and aesthetics, and see exactly which products were used to achieve the look.
          </p>
        </Card>

        <Card hoverable className="p-8 group cursor-pointer" onClick={() => window.location.href='/universe/design'}>
          <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-brand-violet transition-colors">Design Studio</h3>
          <p className="text-ink-muted">
            Launch our advanced 3D designer. Input your room dimensions, drag and drop furniture from our live catalog, and generate an instant layout and cost estimate.
          </p>
        </Card>
      </section>
    </main>
  );
}
