import { CourseRow, SemesterData, CGPAData } from '@/types';

// Quality Points mapping for 40-point scale (credit hours < 3)
const marksToQP40: { [key: number]: number } = {
  16: 2, 17: 2.5, 18: 3, 19: 3.5, 20: 4, 21: 4.33, 22: 4.67, 23: 5,
  24: 5.33, 25: 5.67, 26: 6, 27: 6.33, 28: 6.67, 29: 7, 30: 7.33, 31: 7.67, 32: 8,
  33: 8, 34: 8, 35: 8, 36: 8, 37: 8, 38: 8, 39: 8, 40: 8
};

// Quality Points mapping for 60-point scale (credit hours >= 3)
const marksToQP60: { [key: number]: number } = {
  24: 3, 25: 3.5, 26: 4, 27: 4.5, 28: 5, 29: 5.5, 30: 6, 31: 6.33, 32: 6.67,
  33: 7, 34: 7.33, 35: 7.67, 36: 8, 37: 8.33, 38: 8.67, 39: 9, 40: 9.33, 41: 9.67,
  42: 10, 43: 10.33, 44: 10.67, 45: 11, 46: 11.33, 47: 11.67, 48: 12, 49: 12,
  50: 12, 51: 12, 52: 12, 53: 12, 54: 12, 55: 12, 56: 12, 57: 12, 58: 12, 59: 12, 60: 12
};

export const getQualityPoints = (totalMarks: number, creditHours: number): number => {
  const scale = creditHours >= 3 ? 60 : 40;
  
  if (scale === 40) {
    return marksToQP40[totalMarks] || 0;
  } else {
    return marksToQP60[totalMarks] || 0;
  }
};

// Fallback: Convert grade letter to approximate quality points (if marks not available)
export const gradeToQualityPoints = (grade: string, creditHours: number): number => {
  const gradeMap: { [key: string]: number } = {
    'A+': creditHours >= 3 ? 12 : 8,
    'A': creditHours >= 3 ? 12 : 8,
    'A-': creditHours >= 3 ? 11 : 7.67,
    'B+': creditHours >= 3 ? 10 : 6.67,
    'B': creditHours >= 3 ? 9 : 6,
    'B-': creditHours >= 3 ? 8 : 5.33,
    'C+': creditHours >= 3 ? 7 : 4.67,
    'C': creditHours >= 3 ? 6 : 4,
    'C-': creditHours >= 3 ? 5 : 3.5,
    'D+': creditHours >= 3 ? 4 : 2.67,
    'D': creditHours >= 3 ? 3 : 2,
    'F': 0,
  };
  return gradeMap[grade.toUpperCase()] || 0;
};


export const calculateSemesterGPA = (courses: CourseRow[]): number => {
  let totalQualityPoints = 0;
  let totalCreditHours = 0;

  courses.forEach((course) => {
    // FIX: Parse credit hours properly, don't default 0 to 3
    const creditHours = course.credit_hours ? parseFloat(course.credit_hours) : 0;
    
    // Skip courses with 0 credit hours entirely
    if (creditHours === 0) return;
    
    const totalMarks = parseInt(course.total) || 0;
    
    // Get quality points based on total marks and credit hours
    const qualityPoints = getQualityPoints(totalMarks, creditHours);
    
    totalQualityPoints += qualityPoints;
    totalCreditHours += creditHours;
  });

  return totalCreditHours > 0 ? totalQualityPoints / totalCreditHours : 0;
};

export const groupBySemester = (courses: CourseRow[]): SemesterData[] => {
  const semesterMap: { [key: string]: CourseRow[] } = {};

  courses.forEach((course) => {
    const semester = course.semester || 'Unknown';
    if (!semesterMap[semester]) {
      semesterMap[semester] = [];
    }
    semesterMap[semester].push(course);
  });

  return Object.keys(semesterMap)
    .sort((a, b) => {
      // Sort semesters (Fall 2021, Spring 2022, etc.)
      const semesterOrder = ['Spring', 'Summer', 'Fall'];
      const [seasonA, yearA] = a.split(' ');
      const [seasonB, yearB] = b.split(' ');
      
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      return semesterOrder.indexOf(seasonA) - semesterOrder.indexOf(seasonB);
    })
    .map((semester) => {
      const courses = semesterMap[semester];
      const semesterGPA = calculateSemesterGPA(courses);
      
      // FIX: Only count courses with actual credit hours
      const totalCredits = courses.reduce(
        (sum, course) => {
          const ch = course.credit_hours ? parseFloat(course.credit_hours) : 0;
          return sum + ch;
        },
        0
      );
      
      return {
        semester,
        courses,
        semesterGPA,
        totalCredits,
      };
    });
};

export const calculateCGPA = (semesters: SemesterData[]): CGPAData => {
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach((semester) => {
    totalPoints += semester.semesterGPA * semester.totalCredits;
    totalCredits += semester.totalCredits;
  });

  const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    semesters,
    cgpa,
    totalCredits,
  };
};

export const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};
