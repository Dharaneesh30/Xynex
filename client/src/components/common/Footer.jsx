import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo/xynex-mark.svg';

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-[#171720] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={logoUrl}
                alt="XYNEX" 
                className="h-6 w-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
              />
              <span className="font-display font-semibold text-lg tracking-wide text-[#A78BFA]">XYNEX</span>
            </Link>
            <p className="text-[#F8FAFC] font-medium mb-2">Design Beyond Dimensions.</p>
            <p className="text-[#94A3B8] text-sm max-w-sm">
              XYNEX is an intelligent space-planning universe where imagination becomes experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-[#E2E8F0] mb-4 text-xs tracking-wider uppercase">Universe</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/universe/build" className="hover:text-[#A78BFA] transition-colors">Build</Link></li>
              <li><Link to="/universe/showcase" className="hover:text-[#A78BFA] transition-colors">Showcase</Link></li>
              <li><Link to="/universe/design" className="hover:text-[#A78BFA] transition-colors">Design Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#E2E8F0] mb-4 text-xs tracking-wider uppercase">Company</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/about" className="hover:text-[#A78BFA] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#A78BFA] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#E2E8F0] mb-4 text-xs tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/universe/showcase" className="hover:text-[#A78BFA] transition-colors">Rooms</Link></li>
              <li><Link to="/universe/showcase" className="hover:text-[#A78BFA] transition-colors">Hubs</Link></li>
              <li><Link to="/universe/showcase" className="hover:text-[#A78BFA] transition-colors">Experiences</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#171720] flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8]/60">
          <p>Built beyond the expected. &copy; {new Date().getFullYear()} XYNEX.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
