import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UAF CGPA Calculator - University of Agriculture Faisalabad',
  description: 'Calculate your CGPA instantly for UAF students. Get semester-wise GPA and cumulative CGPA.',
  keywords: 'UAF, CGPA Calculator, University of Agriculture Faisalabad, GPA, Result',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
