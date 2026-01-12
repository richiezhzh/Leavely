'use client';

import { useState } from 'react';
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
  isBefore,
  startOfDay,
  differenceInDays,
} from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, X, CalendarDays } from 'lucide-react';
import { getHoliday, getHolidayEmoji } from '@/lib/holidays';
import { useLanguage } from '@/lib/i18n';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const { t, language } = useLanguage();
  const dateLocale = language === 'zh' ? zhCN : enUS;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day of week for the first day (0 = Sunday)
  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startDayOfWeek).fill(null);

  // 计算休假天数
  const leaveDays = startDate && endDate 
    ? differenceInDays(endDate, startDate) + 1 
    : 0;

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!startDate || (startDate && endDate)) {
      // 开始新的选择
      onStartDateChange(day);
      onEndDateChange(null);
    } else if (startDate && !endDate) {
      // 选择结束日期
      if (isBefore(day, startDate)) {
        // 如果点击的日期在开始日期之前，重新设置开始日期
        onStartDateChange(day);
      } else {
        onEndDateChange(day);
      }
    }
  };

  const handleClearSelection = () => {
    onStartDateChange(null);
    onEndDateChange(null);
  };

  const isInRange = (day: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(day, { start: startDate, end: endDate });
  };

  const isStartDate = (day: Date) => {
    return startDate && isSameDay(day, startDate);
  };

  const isEndDate = (day: Date) => {
    return endDate && isSameDay(day, endDate);
  };

  const isSelected = (day: Date) => {
    return isStartDate(day) || isEndDate(day);
  };

  return (
    <div className="glass-light rounded-2xl p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display font-semibold text-lg text-white">
          {format(currentMonth, language === 'zh' ? 'yyyy年 MMMM' : 'MMMM yyyy', { locale: dateLocale })}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {t.calendar.weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${
              index === 0 || index === 6 ? 'text-primary-400/70' : 'text-white/40'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="h-12" />
        ))}
        {days.map((day) => {
          const isPast = isBefore(day, today);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isStart = isStartDate(day);
          const isEnd = isEndDate(day);
          const inRange = isInRange(day);
          const selected = isSelected(day);
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          // 获取节假日信息
          const holiday = getHoliday(day);
          const isHoliday = holiday?.type === 'holiday';
          const isWorkday = holiday?.type === 'workday';

          // 确定日期单元格的样式
          let cellClass = 'h-12 w-full flex flex-col items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 relative ';
          
          if (isPast) {
            cellClass += 'text-white/20 cursor-not-allowed';
          } else if (isStart) {
            cellClass += 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/30 ring-2 ring-primary-300';
          } else if (isEnd) {
            cellClass += 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 ring-primary-300';
          } else if (inRange) {
            cellClass += 'bg-primary-500/30 text-white';
          } else if (isHoliday) {
            cellClass += 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 cursor-pointer';
          } else if (isWorkday) {
            cellClass += 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 cursor-pointer';
          } else if (!isCurrentMonth) {
            cellClass += 'text-white/20';
          } else if (isWeekend) {
            cellClass += 'text-primary-300/80 hover:bg-white/10 cursor-pointer';
          } else {
            cellClass += 'text-white/80 hover:bg-white/10 cursor-pointer';
          }

          return (
            <button
              type="button"
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              disabled={isPast}
              className={cellClass}
              title={holiday?.name}
            >
              <span>{format(day, 'd')}</span>
              {/* 节假日标记 */}
              {holiday && !isPast && !selected && !inRange && (
                <span className="text-[10px] leading-none mt-0.5">
                  {isHoliday ? getHolidayEmoji(holiday.name) : '班'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 图例说明 */}
      <div className="mt-4 pt-4 border-t border-white/10">
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
            <div className="w-3 h-3 rounded bg-primary-500/30" />
            <span className="text-white/50">{t.calendar.selectedRange2}</span>
          </div>
        </div>
      </div>

      {/* Selection Hint */}
      {!startDate && (
        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="text-white/50 text-sm">
            {t.submitPage.selectStartDate}
          </p>
        </div>
      )}

      {startDate && !endDate && (
        <div className="mt-4 p-4 bg-primary-500/10 rounded-xl border border-primary-500/30 text-center">
          <p className="text-primary-300 text-sm">
            {t.submitPage.selectEndDate}
          </p>
        </div>
      )}

      {/* Selected Range Display */}
      {startDate && endDate && (
        <div className="mt-4 p-4 bg-gradient-to-r from-primary-500/20 to-primary-400/10 rounded-xl border border-primary-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary-300">
              <CalendarDays className="w-5 h-5" />
              <span className="font-medium">{t.calendar.selectedRange}</span>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              {t.clear}
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-white/50 text-xs mb-1">{t.calendar.startDate}</span>
              <span className="text-white font-semibold text-base">
                {format(startDate, language === 'zh' ? 'MM月dd日 (EEE)' : 'MMM dd (EEE)', { locale: dateLocale })}
              </span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-primary-400 text-xl">→</span>
              <span className="text-primary-300 text-xs font-medium">
                {leaveDays} {t.days}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white/50 text-xs mb-1">{t.calendar.endDate}</span>
              <span className="text-white font-semibold text-base">
                {format(endDate, language === 'zh' ? 'MM月dd日 (EEE)' : 'MMM dd (EEE)', { locale: dateLocale })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
