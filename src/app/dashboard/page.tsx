'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO, isWithinInterval, differenceInDays } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import {
  Calendar,
  List,
  Users,
  TrendingUp,
  Clock,
  Search,
  UserCircle,
  Loader2,
  CalendarPlus,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import CalendarView from '@/components/CalendarView';
import LeaveCard from '@/components/LeaveCard';
import CalendarSubscribe from '@/components/CalendarSubscribe';
import { useLeaveStore } from '@/store/leaveStore';
import { LeaveRequest, ViewMode } from '@/types';
import { useLanguage } from '@/lib/i18n';

export default function DashboardPage() {
  const { leaves, isLoading, fetchLeaves } = useLeaveStore();
  const { t, language } = useLanguage();
  const dateLocale = language === 'zh' ? zhCN : enUS;
  
  // 页面加载时获取数据
  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLeaves, setSelectedLeaves] = useState<LeaveRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubscribe, setShowSubscribe] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    const uniqueMembers = new Set(leaves.map((l) => l.name.toLowerCase())).size;
    const totalDays = leaves.reduce((acc, leave) => {
      const start = parseISO(leave.startDate);
      const end = parseISO(leave.endDate);
      return acc + differenceInDays(end, start) + 1;
    }, 0);
    
    const onLeaveToday = leaves.filter((leave) => {
      const start = parseISO(leave.startDate);
      const end = parseISO(leave.endDate);
      return isWithinInterval(today, { start, end });
    }).length;

    return {
      totalLeaves: leaves.length,
      uniqueMembers,
      totalDays,
      onLeaveToday,
    };
  }, [leaves]);

  // Filter leaves by search
  const filteredLeaves = useMemo(() => {
    if (!searchQuery.trim()) return leaves;
    const query = searchQuery.toLowerCase();
    return leaves.filter(
      (leave) =>
        leave.name.toLowerCase().includes(query) ||
        leave.contact.toLowerCase().includes(query)
    );
  }, [leaves, searchQuery]);

  const handleDaySelect = (date: Date, dayLeaves: LeaveRequest[]) => {
    setSelectedDate(date);
    setSelectedLeaves(dayLeaves);
  };

  return (
    <main className="min-h-screen mesh-bg">
      <Navigation />

      {/* Floating Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-96 h-96 bg-primary-500/10 -top-20 right-0 animate-float" />
        <div className="floating-shape w-72 h-72 bg-purple-500/10 bottom-40 -left-20 animate-float delay-400" />
      </div>

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2 animate-slide-up">
                {t.dashboardPage.title}
              </h1>
              <p className="text-white/60 animate-slide-up delay-100">
                {t.dashboardPage.subtitle}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 animate-slide-up delay-200">
              {/* Subscribe Button */}
              <button
                onClick={() => setShowSubscribe(true)}
                className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-medium text-primary-400 hover:bg-white/10 transition-all"
              >
                <CalendarPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{t.calendarIntegration.subscribeCalendar}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 glass rounded-xl p-1.5">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'calendar'
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {t.dashboardPage.calendarView}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4" />
                  {t.dashboardPage.listView}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card animate-slide-up delay-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t.dashboardPage.totalLeaves}</p>
                  <p className="text-2xl font-bold text-white">{stats.totalLeaves}</p>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up delay-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t.dashboardPage.teamMembers}</p>
                  <p className="text-2xl font-bold text-white">{stats.uniqueMembers}</p>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up delay-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t.dashboardPage.totalDays}</p>
                  <p className="text-2xl font-bold text-white">{stats.totalDays}</p>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up delay-400">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t.dashboardPage.onLeaveToday}</p>
                  <p className="text-2xl font-bold text-white">{stats.onLeaveToday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {viewMode === 'calendar' ? (
            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <CalendarView onDaySelect={handleDaySelect} />
              </div>

              {/* Selected Day Details */}
              <div className="space-y-4">
                <div className="card">
                  <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    {selectedDate
                      ? format(selectedDate, language === 'zh' ? 'yyyy年MM月dd日' : 'MMM dd, yyyy', { locale: dateLocale })
                      : t.dashboardPage.selectDateToView}
                  </h3>

                  {selectedDate && (
                    <>
                      {selectedLeaves.length > 0 ? (
                        <div className="space-y-3">
                          {selectedLeaves.map((leave) => (
                            <div
                              key={leave.id}
                              className="p-3 bg-white/[0.03] rounded-xl"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {leave.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">
                                    {leave.name}
                                  </p>
                                  <p className="text-xs text-white/50">
                                    {leave.contact}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/40 text-sm py-4 text-center">
                          {t.dashboardPage.noLeaveOnDay}
                        </p>
                      )}
                    </>
                  )}

                  {!selectedDate && (
                    <p className="text-white/40 text-sm py-4 text-center">
                      {t.dashboardPage.clickToViewDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.dashboardPage.searchPlaceholder}
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Leave List */}
              {filteredLeaves.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredLeaves.map((leave, index) => (
                    <div
                      key={leave.id}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="animate-slide-up"
                    >
                      <LeaveCard leave={leave} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-white/20" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {searchQuery ? t.dashboardPage.noMatchingRecords : t.dashboardPage.noLeaveRecords}
                  </h3>
                  <p className="text-white/50">
                    {searchQuery
                      ? t.dashboardPage.tryOtherKeywords
                      : t.dashboardPage.recordsWillShow}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Calendar Subscribe Modal */}
      <CalendarSubscribe 
        isOpen={showSubscribe} 
        onClose={() => setShowSubscribe(false)} 
      />
    </main>
  );
}
