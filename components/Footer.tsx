'use client';

import { Heart, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span>by <strong>Adil</strong></span>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>Scraping logic credits: 
              <a 
                href="https://github.com/original-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-blue-400 hover:text-blue-300 underline"
              >
                UAF Result Scraper
              </a>
            </p>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t border-gray-800">
            <p>© {new Date().getFullYear()} UAF CGPA Calculator. For educational purposes only.</p>
            <p className="mt-1">Not officially affiliated with University of Agriculture, Faisalabad</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
