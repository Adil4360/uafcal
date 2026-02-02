'use client';

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import ResultDisplay from '@/components/ResultDisplay';
import { ResultData, CGPAData } from '@/types';
import { groupBySemester, calculateCGPA } from '@/utils/gpaCalculations';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [cgpaData, setCgpaData] = useState<CGPAData | null>(null);

  const handleSearch = async (regNumber: string) => {
    setLoading(true);
    setResultData(null);
    setCgpaData(null);

    try {
      const response = await axios.get(`/api/result?reg_number=${regNumber}`);
      
      if (response.data.status === 'success') {
        const data = response.data.data;
        setResultData(data);

        // Calculate CGPA using quality points
        const semesters = groupBySemester(data.result_table.rows);
        const calculatedCGPA = calculateCGPA(semesters);
        setCgpaData(calculatedCGPA);

        toast.success('Results fetched successfully! 🎉', {
          duration: 3000,
        });
      } else {
        toast.error(response.data.message || 'Failed to fetch results');
      }
    } catch (error: any) {
      console.error('Error fetching results:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch results. Please check your registration number and try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCoursesChange = (updatedCGPAData: CGPAData) => {
    setCgpaData(updatedCGPAData);
    toast.success('CGPA recalculated! Click reveal to see updated result.', {
      duration: 3000,
      icon: '🔄',
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized Static Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />
        
        {/* Static gradient orbs - removed animations for performance */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-3xl opacity-20" />
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto w-full">
          {!cgpaData ? (
            <div className="space-y-8">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4"
              >
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4"
                >
                  Calculate Your CGPA Instantly
                </h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4"
                >
                  Enter your UAF registration number to view your complete academic record
                </motion.p>
              </motion.div>
              <SearchForm onSearch={handleSearch} loading={loading} />
            </div>
          ) : (
            <div className="space-y-6">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, x: -5 }}
                onClick={() => {
                  setCgpaData(null);
                  setResultData(null);
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 flex items-center space-x-2 text-lg font-semibold transition-colors"
              >
                <span>←</span>
                <span>Search Another Student</span>
              </motion.button>
              <ResultDisplay
                cgpaData={cgpaData}
                studentName={resultData?.student_info.student_full_name || ''}
                regNumber={resultData?.student_info.registration_ || ''}
                onCoursesChange={handleCoursesChange}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
