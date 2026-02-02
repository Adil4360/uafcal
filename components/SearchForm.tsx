'use client';

import { useState } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFormProps {
  onSearch: (regNumber: string) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [regNumber, setRegNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      onSearch(regNumber.trim());
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30"
        />

        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Enter Your Registration Number
            </h2>
            <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Discover your academic excellence
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="e.g., 2021-ag-1234"
                  className="w-full px-6 py-5 text-lg border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 dark:bg-gray-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
                  disabled={loading}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-0 group-focus-within:opacity-30"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Format: YYYY-ag-XXXX (e.g., 2021-ag-1234)
              </p>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !regNumber.trim()}
              className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-5 px-6 rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              {/* Shine effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1,
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              <span className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Fetching Your Results...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    <span>Get My CGPA</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </motion.div>
  );
}
