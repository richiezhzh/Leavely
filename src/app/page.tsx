'use client';

import Link from 'next/link';
import { Calendar, Users, ArrowRight, Palmtree, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/lib/i18n';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen mesh-bg">
      <Navigation />

      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-96 h-96 bg-primary-500/20 top-20 -left-48 animate-float" />
        <div className="floating-shape w-72 h-72 bg-blue-500/10 top-1/2 right-0 animate-float delay-200" />
        <div className="floating-shape w-80 h-80 bg-purple-500/10 bottom-0 left-1/3 animate-float delay-500" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/70 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span>{t.homePage.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            {t.homePage.title1}
            <br />
            <span className="gradient-text glow-text">{t.homePage.title2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 animate-slide-up delay-100">
            {t.homePage.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
            <Link href="/submit" className="btn-primary flex items-center gap-2 group">
              <span>{t.homePage.ctaSubmit}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{t.homePage.ctaView}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card animate-slide-up delay-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {t.homePage.feature1Title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t.homePage.feature1Desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card animate-slide-up delay-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {t.homePage.feature2Title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t.homePage.feature2Desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card animate-slide-up delay-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                <Palmtree className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {t.homePage.feature3Title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t.homePage.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card glass-light p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-white mb-2">
              {t.homePage.howToUse}
            </h2>
            <p className="text-white/50 mb-8">
              {t.homePage.howToUseSubtitle}
            </p>

            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h4 className="font-medium text-white mb-1">{t.homePage.step1Title}</h4>
                <p className="text-sm text-white/40">{t.homePage.step1Desc}</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h4 className="font-medium text-white mb-1">{t.homePage.step2Title}</h4>
                <p className="text-sm text-white/40">{t.homePage.step2Desc}</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h4 className="font-medium text-white mb-1">{t.homePage.step3Title}</h4>
                <p className="text-sm text-white/40">{t.homePage.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/30">
          <p>{t.homePage.footer}</p>
        </div>
      </footer>
    </main>
  );
}
