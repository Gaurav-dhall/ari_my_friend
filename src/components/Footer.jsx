import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-[rgb(var(--bg-card))] bg-main">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-muted">
          <span className="text-sm font-soft">© 2026 Ari AI. Built with</span>
          <Heart className="w-4 h-4 accent" fill="currentColor" />
          <span className="text-sm font-soft">for you.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-muted hover:text-[rgb(var(--accent))] transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted hover:text-[rgb(var(--accent))] transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
