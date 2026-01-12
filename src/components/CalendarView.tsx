'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLeaveStore } from '@/store/leaveStore';
import { LeaveRequest } from '@/types';
import { getHoliday, getHolidayEmoji } from '@/lib/holidays';
import { useLanguage } from '@/lib/i18n';

interface CalendarViewProps {
  onDaySelect?: (date: Date, leaves: LeaveRequest[]) => void;
}

export default function CalendarView({ onDaySelect }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { leaves } = useLeaveStore();
  const { t, language } = useLanguage();
  const dateLocale = language === 'zh' ? zhCN : enUS;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startDayOfWeek).fill(null);

  // Get leaves for each day
  const getLeavesForDay = useMemo(() => {
    return (day: Date): LeaveRequest[] => {
      return leaves.filter((leave) => {
        const start = parseISO(leave.startDate);
        const end = parseISO(leave.endDate);
        return isWithinInterval(day, { start, end });
      });
    };
  }, [leaves]);

  const handleDayClick = (day: Date) => {
    const dayLeaves = getLeavesForDay(day);
    setSelectedDate(day);
    onDaySelect?.(day, dayLeaves);
  };

  // Color coding based on number of people on leave
  const getLeaveIndicator = (count: number) => {
    if (count === 0) return null;
    if (count === 1) return 'bg-emerald-500';
    if (count === 2) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="glass rounded-2xl p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display font-semibold text-xl text-white">
          {format(currentMonth, language === 'zh' ? 'yyyy年 MMMM' : 'MMMM yyyy', { locale: dateLocale })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {t.calendar.weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0 || index === 6 ? 'text-primary-400/70' : 'text-white/40'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="h-16" />
        ))}
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const dayLeaves = getLeavesForDay(day);
          const leaveCount = dayLeaves.length;
          const indicator = getLeaveIndicator(leaveCount);
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          // 获取节假日信息
          const holiday = getHoliday(day);
          const isHoliday = holiday?.type === 'holiday';
          const isWorkday = holiday?.type === 'workday';

          // 确定背景样式
          let bgClass = '';
          if (isSelected) {
            bgClass = 'bg-primary-500 text-white';
          } else if (isHoliday) {
            bgClass = 'bg-rose-500/15 hover:bg-rose-500/25';
          } else if (isWorkday) {
            bgClass = 'bg-amber-500/15 hover:bg-amber-500/25';
          } else {
            bgClass = 'hover:bg-white/10';
          }

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              title={holiday?.name}
              className={`h-16 rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                !isCurrentMonth ? 'text-white/20' : isWeekend && !isSelected ? 'text-primary-300/80' : 'text-white/80'
              } ${isToday ? 'ring-2 ring-primary-400/60' : ''} ${bgClass}`}
            >
              {/* 节假日图标 */}
              {holiday && !isSelected && (
                <span className="absolute top-1 right-1 text-[10px]">
                  {isHoliday ? getHolidayEmoji(holiday.name) : '💼'}
                </span>
              )}
              
              <span className="text-sm font-medium">{format(day, 'd')}</span>
              
              {/* Leave indicator */}
              {indicator && (
                <div className="flex items-center gap-1 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${indicator}`} />
                  <span className="text-xs text-white/60">{leaveCount}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-rose-500/30" />
            <span className="text-white/50">{t.calendar.holiday}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-500/30" />
            <span className="text-white/50">{t.calendar.workday}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-white/50">{t.calendar.onePerson}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-white/50">{t.calendar.twoPeople}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-white/50">{t.calendar.threeOrMore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
