import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import logoUrl from '../../assets/logo/xynex-mark.svg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowAuthPopup(!showAuthPopup);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Xynex Universe', path: '/universe' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#08080C]/95 backdrop-blur-xl border-b border-[#1F1930] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoUrl}
            alt="XYNEX" 
            className="h-8 w-8 transition-transform group-hover:scale-105" 
          />
          <span className="font-display font-bold text-xl tracking-wide text-[#F8FAFC]">XYNEX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isMatch = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            
            const activeClass = isMatch 
              ? `text-[#8B5CF6] [text-shadow:0_0_10px_rgba(139,92,246,0.3)]` 
              : 'text-[#CBD5E1] hover:text-[#F8FAFC]';

            return (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 ${activeClass}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <Link 
              to="/universe/cart" 
              className="relative text-[#CBD5E1] hover:text-[#7C3AED] transition-colors flex items-center justify-center w-8 h-8"
              aria-label="Cart"
              onClick={handleCartClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7C3AED] text-[#FFFFFF] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Popup */}
            {showAuthPopup && !user && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-[#0D0D14] border border-[#272333] rounded-xl p-5 shadow-2xl flex flex-col items-center z-50">
                <p className="text-[#F8FAFC] font-medium mb-1 text-center">Login to view cart</p>
                <p className="text-[#94A3B8] text-xs text-center mb-5 leading-relaxed">Please log in or sign up to continue designing your space.</p>
                <div className="flex flex-col gap-3 w-full">
                  <Button to="/login" variant="cyan" className="w-full text-center py-2 text-sm justify-center" onClick={() => setShowAuthPopup(false)}>Log In</Button>
                  <Button to="/register" variant="outline" className="w-full text-center py-2 text-sm justify-center border-[#7C3AED] text-[#A78BFA] hover:bg-[rgba(124,58,237,0.12)] hover:border-[#8B5CF6] hover:text-[#FFFFFF]" onClick={() => setShowAuthPopup(false)}>Sign Up</Button>
                </div>
              </div>
            )}
          </div>
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-ink/10" />
            </Link>
          ) : (
            <Button to="/login" variant="ghost">Log In</Button>
          )}
          <Button to="/universe" variant="primary">Enter Universe</Button>
        </div>
      </div>
    </nav>
  );
}
