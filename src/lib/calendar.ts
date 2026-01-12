import { LeaveRequest } from '@/types';

/**
 * 生成 ICS 格式的日历事件
 */
export function generateICSEvent(leave: LeaveRequest): string {
  const startDate = formatDateToICS(new Date(leave.startDate));
  const endDate = formatDateToICS(addDays(new Date(leave.endDate), 1)); // ICS 结束日期是不包含的
  const uid = `${leave.id}@leavely`;
  const now = formatDateTimeToICS(new Date());
  
  const summary = `🏖️ ${leave.name} - Leave`;
  const description = leave.reason 
    ? `Leave period for ${leave.name}\\nContact: ${leave.contact}\\nReason: ${leave.reason}`
    : `Leave period for ${leave.name}\\nContact: ${leave.contact}`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Leavely//Team Leave Management//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Leavely - Team Leaves
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
}

/**
 * 格式化日期为 ICS 日期格式 (YYYYMMDD)
 */
function formatDateToICS(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * 格式化日期时间为 ICS 格式 (YYYYMMDDTHHMMSSZ)
 */
function formatDateTimeToICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * 添加天数
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 下载 ICS 文件
 */
export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
