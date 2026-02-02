import { NextRequest, NextResponse } from 'next/server';
import { scraper } from '@/lib/scraper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const regNumber = searchParams.get('reg_number');

    if (!regNumber) {
      return NextResponse.json(
        { status: 'error', message: 'Registration number is required' },
        { status: 400 }
      );
    }

    const regNumberPattern = /^\d{4}-ag-\d{1,6}$/i;
    if (!regNumberPattern.test(regNumber)) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid registration number format (e.g., 2021-ag-1234)' },
        { status: 400 }
      );
    }

    console.log('Fetching result for:', regNumber);
    const result = await scraper.getResult(regNumber);
    
    if (!result.student_info || !result.result_table || !result.result_table.rows) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid result data structure' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      data: {
        metadata: result.metadata,
        student_info: result.student_info,
        result_table: result.result_table
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Failed to fetch results. Please try again.'
      },
      { status: 500 }
    );
  }
}
