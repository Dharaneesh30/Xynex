import React from 'react';
import ButterflyIntro from '../components/landing/ButterflyIntro';
import { useSessionIntroFlag } from '../hooks/useSessionIntroFlag';

export default function Home() {
  const { showIntro, markIntroSeen } = useSessionIntroFlag();

  return (
    <>
      {showIntro && <ButterflyIntro onComplete={markIntroSeen} />}
      
      {!showIntro && (
        <div className="pt-24 min-h-screen px-6 max-w-7xl mx-auto">
          <h1 className="text-4xl font-display">Home Page</h1>
          <p className="mt-4 text-ink-muted">Welcome to XYNEX. The intro has completed.</p>
        </div>
      )}
    </>
  );
}
