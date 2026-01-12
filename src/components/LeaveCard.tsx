'use client';

import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { Calendar, Phone, Trash2, User, Loader2, Download } from 'lucide-react';
import { LeaveRequest } from '@/types';
import { useLeaveStore } from '@/store/leaveStore';
import { useLanguage } from '@/lib/i18n';
import { generateICSEvent, downloadICS } from '@/lib/calendar';

interface LeaveCardProps {
  leave: LeaveRequest;
  showActions?: boolean;
}

export default function LeaveCard({ leave, showActions = true }: LeaveCardProps) {
  const { removeLeave } = useLeaveStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { t, language } = useLanguage();
  const dateLocale = language === 'zh' ? zhCN : enUS;
  
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);
  const duration = differenceInDays(endDate, startDate) + 1;

  const handleDelete = async () => {
    if (confirm(t.leaveCard.confirmDelete)) {
      setIsDeleting(true);
      await removeLeave(leave.id);
      setIsDeleting(false);
    }
  };

  const handleDownloadICS = () => {
    const ics = generateICSEvent(leave);
    const filename = `leave-${leave.name}-${leave.startDate}.ics`;
    downloadICS(ics, filename);
  };

  return (
    <div className="card group animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <User className="w-6 h-6 text-white" />
          </div>
          
          {/* Info */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white">
              {leave.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-white/50">
              <Phone className="w-3.5 h-3.5" />
              <span>{leave.contact}</span>
            </div>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-400 text-sm font-medium">
          {duration} {t.days}
        </div>
      </div>

      {/* Date Range */}
      <div className="mt-4 p-4 bg-white/[0.03] rounded-xl">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-400" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white">
              {format(startDate, language === 'zh' ? 'yyyy年MM月dd日' : 'MMM dd, yyyy', { locale: dateLocale })}
            </span>
            <span className="text-white/30">→</span>
            <span className="text-white">
              {format(endDate, language === 'zh' ? 'yyyy年MM月dd日' : 'MMM dd, yyyy', { locale: dateLocale })}
            </span>
          </div>
        </div>
        {leave.reason && (
          <p className="mt-3 text-sm text-white/50 pl-8">
            {t.leaveCard.remark}: {leave.reason}
          </p>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-4 flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Download ICS Button */}
          <button
            onClick={handleDownloadICS}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary-400 hover:bg-primary-500/10 transition-colors text-sm"
            title={t.calendarIntegration.downloadICS}
          >
            <Download className="w-4 h-4" />
            {t.calendarIntegration.downloadICS}
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isDeleting ? t.deleting : t.delete}
          </button>
        </div>
      )}
    </div>
  );
}
