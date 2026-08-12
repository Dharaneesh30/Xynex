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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Xynex Universe', path: '/universe' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-bg-base/80 backdrop-blur-md border-b border-ink/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoUrl}
            alt="XYNEX" 
            className="h-8 w-8 transition-transform group-hover:scale-105" 
          />
          <span className="font-display font-bold text-xl tracking-wide text-ink">XYNEX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-brand-violet-light ${
                  isActive || (link.path !== '/' && location.pathname.startsWith(link.path))
                    ? 'text-brand-blue' 
                    : 'text-ink-muted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/universe/cart" 
            className="relative text-ink hover:text-brand-blue transition-colors"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-violet-light text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
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
