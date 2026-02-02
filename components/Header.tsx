'use client';

import { Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left side - Logo & Title */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Text */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                UAF CGPA Calculator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                University of Agriculture, Faisalabad
              </p>
            </div>
          </motion.div>
          
          {/* Right side - Credits Badge */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium">Track Your Progress</span>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-4 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Made by Adil
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
