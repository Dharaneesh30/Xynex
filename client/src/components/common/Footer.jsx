import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo/xynex-mark.svg';

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-[#1F1930] pt-16 pb-8 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={logoUrl}
                alt="XYNEX" 
                className="h-6 w-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
              />
              <span className="font-display font-semibold text-lg tracking-wide text-[#F8FAFC]">XYNEX</span>
            </Link>
            <p className="text-[#F8FAFC] font-medium mb-3">Design Beyond Dimensions.</p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              An evolving digital universe where imagination, technology, and spatial design meet.
            </p>
          </div>
          
          {/* Explore */}
          <div>
            <h4 className="font-medium text-[#F8FAFC] mb-6 text-sm">Explore</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><Link to="/" className="hover:text-[#7C3AED] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#7C3AED] transition-colors">About</Link></li>
              <li><Link to="/universe" className="hover:text-[#7C3AED] transition-colors">Xynex Universe</Link></li>
              <li><Link to="/universe/build" className="hover:text-[#7C3AED] transition-colors">Build</Link></li>
              <li><Link to="/universe/showcase" className="hover:text-[#7C3AED] transition-colors">Showcase</Link></li>
              <li><Link to="/universe/design" className="hover:text-[#7C3AED] transition-colors">Design Studio</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-[#F8FAFC] mb-6 text-sm">Connect</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><Link to="/contact" className="hover:text-[#06B6D4] transition-colors">Contact</Link></li>
              <li><a href="https://linkedin.com/in/dharaneesh30" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/Dharaneesh30" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-[#F8FAFC] mb-6 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><Link to="/privacy-policy" className="hover:text-[#7C3AED] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#7C3AED] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[#1F1930] flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8]">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} XYNEX. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-[#F8FAFC] transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#F8FAFC] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
