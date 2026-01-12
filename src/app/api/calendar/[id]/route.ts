import { NextRequest, NextResponse } from 'next/server';
import { leaveDb } from '@/lib/db';

/**
 * GET /api/calendar/[id] - 获取单个休假的 ICS 文件
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leave = leaveDb.getById(params.id);
    
    if (!leave) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      );
    }

    const now = formatDateTimeToICS(new Date());
    const startDate = formatDateToICS(new Date(leave.start_date));
    const endDate = formatDateToICS(addDays(new Date(leave.end_date), 1));
    const uid = `${leave.id}@leavely`;
    
    const summary = `🏖️ ${leave.name} - Leave`;
    const description = leave.reason 
      ? `Leave period for ${leave.name}\\nContact: ${leave.contact}\\nReason: ${leave.reason}`
      : `Leave period for ${leave.name}\\nContact: ${leave.contact}`;

    const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Leavely//Team Leave Management//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${leave.name} - Leave
X-WR-TIMEZONE:Asia/Shanghai
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:${summary}
DESCRIPTION:${description}
TRANSP:TRANSPARENT
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const filename = `leave-${leave.name}-${leave.start_date}.ics`;

    return new NextResponse(calendar, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (error) {
    console.error('Failed to generate calendar:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar' },
      { status: 500 }
    );
  }
}

function formatDateToICS(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatDateTimeToICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

