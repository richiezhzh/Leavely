'use client';

import { Download, Calendar, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface CalendarSubscribeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarSubscribe({ isOpen, onClose }: CalendarSubscribeProps) {
  const { t, language } = useLanguage();

  const handleDownload = () => {
    window.location.href = '/api/calendar';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass rounded-2xl p-6 max-w-md w-full animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl text-white">
              {t.calendarIntegration.exportAll}
            </h3>
            <p className="text-sm text-white/50">Outlook / Google / Apple Calendar</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 mb-6">
          {language === 'zh' 
            ? '下载包含所有团队休假信息的 ICS 文件，可导入到 Outlook、Google 日历或 Apple 日历中。'
            : 'Download an ICS file containing all team leave information. Import it into Outlook, Google Calendar, or Apple Calendar.'
          }
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl hover:from-primary-600 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/25"
        >
          <Download className="w-5 h-5" />
          {t.calendarIntegration.downloadICS}
        </button>

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">
            {language === 'zh' ? '如何导入到 Outlook：' : 'How to import to Outlook:'}
          </h4>
          <ol className="text-xs text-white/50 space-y-2 list-decimal list-inside">
            {language === 'zh' ? (
              <>
                <li>点击上方按钮下载 ICS 文件</li>
                <li>双击下载的文件，Outlook 会自动打开</li>
                <li>点击"保存并关闭"添加到日历</li>
              </>
            ) : (
              <>
                <li>Click the button above to download the ICS file</li>
                <li>Double-click the downloaded file, Outlook will open automatically</li>
                <li>Click "Save & Close" to add to your calendar</li>
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
