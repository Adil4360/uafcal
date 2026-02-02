'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CGPAData, SemesterData, CourseRow, NewCourse } from '@/types';
import { formatGPA, getQualityPoints } from '@/utils/gpaCalculations';
import { Eye, Award, BookOpen, Calendar, TrendingUp, Star, Sparkles, Plus, Trash2, X, Save, GraduationCap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultDisplayProps {
  cgpaData: CGPAData;
  studentName: string;
  regNumber: string;
  onCoursesChange: (updatedCGPAData: CGPAData) => void;
}

export default function ResultDisplay({ cgpaData, studentName, regNumber, onCoursesChange }: ResultDisplayProps) {
  const [isBlurred, setIsBlurred] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState<NewCourse>({
    course_code: '',
    course_title: '',
    credit_hours: '3',
    total: '',
    grade: '',
    teacher_name: ''
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.myinstants.com/media/sounds/faaah.mp3');
  }, []);

  const handleUnblur = useCallback(() => {
    setIsBlurred(false);
    setShowConfetti(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleDeleteCourse = useCallback((semesterName: string, courseId: string) => {
    const updatedSemesters = cgpaData.semesters.map(sem => {
      if (sem.semester === semesterName) {
        const updatedCourses = sem.courses.filter((_, idx) => idx.toString() !== courseId);
        return recalculateSemester(sem.semester, updatedCourses);
      }
      return sem;
    });

    const updatedCGPA = recalculateCGPA(updatedSemesters);
    onCoursesChange(updatedCGPA);
    setIsBlurred(true);
  }, [cgpaData.semesters, onCoursesChange]);

  const handleAddCourse = useCallback((semesterName: string) => {
    if (!newCourse.course_code || !newCourse.total || !newCourse.credit_hours) {
      alert('Please fill in all required fields');
      return;
    }

    const courseToAdd: CourseRow = {
      sr: '',
      semester: semesterName,
      teacher_name: newCourse.teacher_name || 'N/A',
      course_code: newCourse.course_code,
      course_title: newCourse.course_title || newCourse.course_code,
      credit_hours: newCourse.credit_hours,
      mid: '',
      assignment: '',
      final: '',
      practical: '',
      total: newCourse.total,
      grade: newCourse.grade || calculateGrade(parseInt(newCourse.total), parseFloat(newCourse.credit_hours)),
      id: Date.now().toString()
    };

    const updatedSemesters = cgpaData.semesters.map(sem => {
      if (sem.semester === semesterName) {
        const updatedCourses = [...sem.courses, courseToAdd];
        return recalculateSemester(sem.semester, updatedCourses);
      }
      return sem;
    });

    const updatedCGPA = recalculateCGPA(updatedSemesters);
    onCoursesChange(updatedCGPA);
    
    setNewCourse({
      course_code: '',
      course_title: '',
      credit_hours: '3',
      total: '',
      grade: '',
      teacher_name: ''
    });
    setShowAddForm(false);
    setEditingSemester(null);
    setIsBlurred(true);
  }, [newCourse, cgpaData.semesters, onCoursesChange]);

  const calculateGrade = (totalMarks: number, creditHours: number): string => {
    const scale = creditHours >= 3 ? 60 : 40;
    if (scale === 60) {
      if (totalMarks >= 54) return 'A+';
      if (totalMarks >= 48) return 'A';
      if (totalMarks >= 45) return 'A-';
      if (totalMarks >= 42) return 'B+';
      if (totalMarks >= 39) return 'B';
      if (totalMarks >= 36) return 'B-';
      if (totalMarks >= 33) return 'C+';
      if (totalMarks >= 30) return 'C';
      if (totalMarks >= 27) return 'C-';
      if (totalMarks >= 24) return 'D';
      return 'F';
    } else {
      if (totalMarks >= 36) return 'A+';
      if (totalMarks >= 32) return 'A';
      if (totalMarks >= 30) return 'A-';
      if (totalMarks >= 28) return 'B+';
      if (totalMarks >= 26) return 'B';
      if (totalMarks >= 24) return 'B-';
      if (totalMarks >= 22) return 'C+';
      if (totalMarks >= 20) return 'C';
      if (totalMarks >= 18) return 'C-';
      if (totalMarks >= 16) return 'D';
      return 'F';
    }
  };

  const recalculateSemester = (semesterName: string, courses: CourseRow[]): SemesterData => {
    let totalQualityPoints = 0;
    let totalCreditHours = 0;

    courses.forEach(course => {
      const creditHours = course.credit_hours ? parseFloat(course.credit_hours) : 0;
      if (creditHours === 0) return;
      
      const totalMarks = parseInt(course.total) || 0;
      const qualityPoints = getQualityPoints(totalMarks, creditHours);
      
      totalQualityPoints += qualityPoints;
      totalCreditHours += creditHours;
    });

    const semesterGPA = totalCreditHours > 0 ? totalQualityPoints / totalCreditHours : 0;

    return {
      semester: semesterName,
      courses,
      semesterGPA,
      totalCredits: totalCreditHours
    };
  };

  const recalculateCGPA = (semesters: SemesterData[]): CGPAData => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      totalPoints += semester.semesterGPA * semester.totalCredits;
      totalCredits += semester.totalCredits;
    });

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return {
      semesters,
      cgpa,
      totalCredits
    };
  };

  const getCGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'from-emerald-500 via-green-500 to-teal-500';
    if (gpa >= 3.0) return 'from-blue-500 via-cyan-500 to-sky-500';
    if (gpa >= 2.5) return 'from-yellow-500 via-amber-500 to-orange-500';
    return 'from-red-500 via-rose-500 to-pink-500';
  };

  // Optimized confetti - reduced particles
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti: any[] = [];
    const confettiCount = 80; // Reduced from 150
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
        ctx.stroke();

        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

        if (c.y > canvas.height) {
          confetti[i] = {
            ...c,
            x: Math.random() * canvas.width,
            y: -30,
            tilt: Math.floor(Math.random() * 10) - 10
          };
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showConfetti]);

  return (
    <div className="space-y-8 relative">
      {showConfetti && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}

      {/* Main CGPA Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-6 md:mb-8 gap-4">
            <div className="space-y-2 w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
                {studentName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-base sm:text-lg break-all">
                {regNumber}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg flex-shrink-0">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>

          {/* CGPA Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Your CGPA
                  </h3>
                  <button
                    onClick={handleUnblur}
                    disabled={!isBlurred}
                    className={`p-2 rounded-lg transition-all ${
                      isBlurred
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                
                <div className={`transition-all duration-500 ${isBlurred ? 'blur-xl' : 'blur-0'}`}>
                  <div className={`text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r ${getCGPAColor(cgpaData.cgpa)} bg-clip-text text-transparent mb-2`}>
                    {formatGPA(cgpaData.cgpa)}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Out of 4.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Credits</div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">{cgpaData.totalCredits}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 p-3 rounded-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Semesters</div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">{cgpaData.semesters.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Semester Cards */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
          <span>Academic Journey</span>
        </h3>
        
        <div className="grid gap-6">
          {cgpaData.semesters.map((semester: SemesterData, idx: number) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="group"
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Semester Header */}
                  <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 md:p-4 rounded-xl shadow-lg">
                          <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            {semester.semester}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {semester.courses.length} Courses • {semester.totalCredits} Credit Hours
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-left sm:text-right">
                          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Semester GPA</div>
                          <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${getCGPAColor(semester.semesterGPA)} bg-clip-text text-transparent`}>
                            {formatGPA(semester.semesterGPA)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setEditingSemester(semester.semester);
                            setShowAddForm(true);
                          }}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 md:p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex-shrink-0"
                          title="Add Course"
                        >
                          <Plus className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add Course Form */}
                  <AnimatePresence>
                    {showAddForm && editingSemester === semester.semester && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                              <Plus className="w-5 h-5 text-green-600" />
                              Add New Course
                            </h5>
                            <button
                              onClick={() => {
                                setShowAddForm(false);
                                setEditingSemester(null);
                              }}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Course Code *"
                              value={newCourse.course_code}
                              onChange={(e) => setNewCourse({...newCourse, course_code: e.target.value})}
                              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Course Title"
                              value={newCourse.course_title}
                              onChange={(e) => setNewCourse({...newCourse, course_title: e.target.value})}
                              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Credit Hours *"
                              value={newCourse.credit_hours}
                              onChange={(e) => setNewCourse({...newCourse, credit_hours: e.target.value})}
                              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Total Marks *"
                              value={newCourse.total}
                              onChange={(e) => setNewCourse({...newCourse, total: e.target.value})}
                              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Grade (auto)"
                              value={newCourse.grade}
                              onChange={(e) => setNewCourse({...newCourse, grade: e.target.value})}
                              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <button
                              onClick={() => handleAddCourse(semester.semester)}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Courses Table */}
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Course</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Code</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">CH</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Marks</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {semester.courses.map((course, courseIdx) => {
                            const creditHours = course.credit_hours ? parseFloat(course.credit_hours) : 0;
                            
                            return (
                              <tr
                                key={courseIdx}
                                className="hover:bg-indigo-50/50 dark:hover:bg-gray-700/30 transition-colors"
                              >
                                <td className="px-3 md:px-6 py-3 md:py-4 text-gray-800 dark:text-gray-200 font-medium text-xs md:text-sm">
                                  <div className="max-w-[150px] md:max-w-none truncate" title={course.course_title}>
                                    {course.course_title}
                                  </div>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                                  {course.course_code}
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                  <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                    creditHours === 0 
                                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                                  }`}>
                                    {creditHours === 0 ? '0' : creditHours}
                                  </span>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-center text-gray-800 dark:text-gray-200 font-bold text-sm">
                                  {course.total}
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                  <span className={`inline-flex items-center px-2 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold ${
                                    course.grade === 'A+' || course.grade === 'A' 
                                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-200'
                                      : course.grade === 'B+' || course.grade === 'B' || course.grade === 'B-'
                                      ? 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-200'
                                      : course.grade === 'C+' || course.grade === 'C' || course.grade === 'C-'
                                      ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-200'
                                      : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-200'
                                  }`}>
                                    {course.grade}
                                  </span>
                                </td>
                                <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                  <button
                                    onClick={() => handleDeleteCourse(semester.semester, courseIdx.toString())}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5 md:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:scale-110"
                                    title="Delete Course"
                                  >
                                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
