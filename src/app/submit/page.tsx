'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { User, Phone, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DateRangePicker from '@/components/DateRangePicker';
import { useLeaveStore } from '@/store/leaveStore';
import { useLanguage } from '@/lib/i18n';

export default function SubmitPage() {
  const router = useRouter();
  const { addLeave } = useLeaveStore();
  const { t } = useLanguage();
  
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = t.submitPage.errorName;
    }
    if (!contact.trim()) {
      newErrors.contact = t.submitPage.errorContact;
    }
    if (!startDate) {
      newErrors.date = t.submitPage.errorStartDate;
    }
    if (!endDate) {
      newErrors.date = t.submitPage.errorEndDate;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await addLeave({
        name: name.trim(),
        contact: contact.trim(),
        startDate: format(startDate!, 'yyyy-MM-dd'),
        endDate: format(endDate!, 'yyyy-MM-dd'),
        reason: reason.trim() || undefined,
      });

      setSubmitted(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setErrors({ submit: t.submitPage.errorSubmit });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen mesh-bg">
        <Navigation />
        <div className="pt-32 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-4 animate-slide-up">
              {t.submitPage.successTitle}
            </h1>
            <p className="text-white/60 animate-slide-up delay-100">
              {t.submitPage.successMessage}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen mesh-bg">
      <Navigation />

      {/* Floating Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-80 h-80 bg-primary-500/15 top-40 -right-40 animate-float" />
        <div className="floating-shape w-64 h-64 bg-blue-500/10 bottom-20 left-10 animate-float delay-300" />
      </div>

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-white mb-4 animate-slide-up">
              {t.submitPage.title}
            </h1>
            <p className="text-white/60 animate-slide-up delay-100">
              {t.submitPage.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up delay-200">
            {/* Personal Info */}
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-400" />
                {t.submitPage.personalInfo}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    {t.submitPage.name} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.submitPage.namePlaceholder}
                    className={`input-field ${errors.name ? 'ring-2 ring-red-400/50' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    {t.submitPage.contact} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t.submitPage.contactPlaceholder}
                      className={`input-field pl-11 ${errors.contact ? 'ring-2 ring-red-400/50' : ''}`}
                    />
                  </div>
                  {errors.contact && (
                    <p className="text-red-400 text-sm mt-2">{errors.contact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {t.submitPage.selectDate}
              </h2>
              
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
              {errors.date && (
                <p className="text-red-400 text-sm mt-4">{errors.date}</p>
              )}
            </div>

            {/* Reason (Optional) */}
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-400" />
                {t.submitPage.remarkTitle} <span className="text-white/30 text-sm font-normal">{t.submitPage.remarkOptional}</span>
              </h2>
              
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.submitPage.remarkPlaceholder}
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t.submitPage.submitButton}
                </>
              )}
            </button>
            {errors.submit && (
              <p className="text-red-400 text-sm text-center mt-2">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
