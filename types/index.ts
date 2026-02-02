export interface CourseRow {
  sr: string;
  semester: string;
  teacher_name: string;
  course_code: string;
  course_title: string;
  credit_hours: string;
  mid: string;
  assignment: string;
  final: string;
  practical: string;
  total: string;
  grade: string;
  id?: string; // Add unique ID for course management
}

export interface StudentInfo {
  student_full_name: string;
  registration_: string;
  [key: string]: string;
}

export interface ResultData {
  metadata: {
    title: string;
    header_image: string;
  };
  student_info: StudentInfo;
  result_table: {
    headers: string[];
    rows: CourseRow[];
  };
}

export interface SemesterData {
  semester: string;
  courses: CourseRow[];
  semesterGPA: number;
  totalCredits: number;
}

export interface CGPAData {
  semesters: SemesterData[];
  cgpa: number;
  totalCredits: number;
}

export interface NewCourse {
  course_code: string;
  course_title: string;
  credit_hours: string;
  total: string;
  grade: string;
  teacher_name?: string;
}
