import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo/xynex-mark.svg';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-ink/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={logoUrl}
                alt="XYNEX" 
                className="h-6 w-6 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
              />
              <span className="font-display font-semibold text-lg tracking-wide text-ink">XYNEX</span>
            </Link>
            <p className="text-ink-muted text-sm max-w-sm">
              Design Beyond Dimensions. The intelligent space-planning platform that turns imagination into exact specifications.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-ink mb-4">Universe</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link to="/universe" className="hover:text-brand-blue transition-colors">Hub</Link></li>
              <li><Link to="/universe/showcase" className="hover:text-brand-blue transition-colors">Showcase</Link></li>
              <li><Link to="/universe/design" className="hover:text-brand-blue transition-colors">Design Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link to="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-ink/5 flex flex-col md:flex-row items-center justify-between text-xs text-ink-muted/50">
          <p>&copy; {new Date().getFullYear()} XYNEX. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
