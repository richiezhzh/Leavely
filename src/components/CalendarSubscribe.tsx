'use client';

import { useState, useEffect } from 'react';
import { CalendarPlus, Copy, Check, ExternalLink, Download, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface CalendarSubscribeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarSubscribe({ isOpen, onClose }: CalendarSubscribeProps) {
  const [copied, setCopied] = useState(false);
  const [subscribeUrl, setSubscribeUrl] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    // 在客户端获取完整URL
    if (typeof window !== 'undefined') {
      setSubscribeUrl(`${window.location.origin}/api/calendar`);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(subscribeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    window.location.href = '/api/calendar';
  };

  const handleAddToOutlook = () => {
    // Outlook Web calendar subscription URL
    const encodedUrl = encodeURIComponent(subscribeUrl);
    window.open(`https://outlook.office.com/calendar/0/addfromweb?url=${encodedUrl}`, '_blank');
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
            <CalendarPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl text-white">
              {t.calendarIntegration.subscribeCalendar}
            </h3>
            <p className="text-sm text-white/50">Outlook / Google / Apple Calendar</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 mb-6">
          {t.calendarIntegration.subscribeDesc}
        </p>

        {/* URL Input */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white/80 text-sm font-mono truncate border border-white/10">
            {subscribeUrl}
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
              copied 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? t.calendarIntegration.copied : t.calendarIntegration.copyLink}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToOutlook}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            {t.calendarIntegration.addToOutlook}
          </button>
          
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 text-white/80 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            {t.calendarIntegration.downloadICS}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">
            {t.language === 'zh' ? '如何订阅：' : 'How to subscribe:'}
          </h4>
          <ol className="text-xs text-white/50 space-y-2 list-decimal list-inside">
            {t.language === 'zh' ? (
              <>
                <li>复制上方链接</li>
                <li>打开 Outlook → 添加日历 → 从网络订阅</li>
                <li>粘贴链接并保存</li>
                <li>日历会自动同步团队休假信息</li>
              </>
            ) : (
              <>
                <li>Copy the link above</li>
                <li>Open Outlook → Add Calendar → Subscribe from web</li>
                <li>Paste the link and save</li>
                <li>Calendar will auto-sync team leave info</li>
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

