'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, UserPlus, LayoutDashboard, Palmtree } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import LanguageSwitch from './LanguageSwitch';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.home, icon: LayoutDashboard },
    { href: '/submit', label: t.nav.leavePlan, icon: UserPlus },
    { href: '/dashboard', label: t.nav.teamStats, icon: Calendar },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
              <Palmtree className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-semibold text-xl text-white">
              {t.appName}
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/25'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Language Switch */}
            <div className="ml-2 pl-2 border-l border-white/10">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
