import { useState, useEffect } from 'react';

export function useSessionIntroFlag() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if the user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('xynex_intro_seen');
    return !hasSeenIntro;
  });

  const markIntroSeen = () => {
    sessionStorage.setItem('xynex_intro_seen', 'true');
    setShowIntro(false);
  };

  return { showIntro, markIntroSeen };
}
