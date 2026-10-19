import React from 'react';
import { Check, Sparkles, ArrowRight, Clock, Zap, ShieldCheck, Laptop, Smartphone } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../services/i18n';

interface HeroSectionProps {
  language: Language;
  currency: Currency;
  onOpenQuoteModal: () => void;
  onScrollToServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenQuoteModal,
  onScrollToServices,
}) => {
  const t = translations[language].hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 bg-grid-pattern">
      {/* Radial ambient glow orbs matching the image's deep violet-cyan lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#8B7FF5]/15 via-[#4BE0E8]/15 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#4BE0E8]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-[#8B7FF5]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Brand Tagline pill / badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121838]/80 border border-[#2b356e] mb-8 shadow-[0_0_20px_rgba(75,224,232,0.15)]">
          <div className="w-2 h-2 rounded-full bg-[#4BE0E8] animate-ping"></div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider bg-gradient-to-r from-white via-slate-200 to-[#4BE0E8] bg-clip-text text-transparent uppercase font-mono">
            {t.badge}
          </span>
        </div>

        {/* Main Headline replicating the flyer */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            {t.question}
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase bg-gradient-to-r from-[#9b8cff] via-[#63e5ec] to-[#4be0e8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(75,224,232,0.4)]">
            {t.headlineStrong}
          </h2>
        </div>

        {/* Device Mockup Graphic representing the Laptop and Phone from the flyer */}
        <div className="relative max-w-4xl mx-auto my-12 group">
          
          {/* Glowing backplate */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B7FF5]/20 via-[#4BE0E8]/10 to-transparent blur-2xl -z-10 rounded-3xl"></div>

          {/* Floating UI Widget top-right (from the image) */}
          <div className="absolute -top-6 -right-2 sm:right-6 z-20 bg-[#0e1329]/95 border border-[#283570] rounded-2xl p-3 shadow-2xl backdrop-blur-md hidden sm:block transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4BE0E8]"></span>
              <span className="text-[11px] font-mono text-slate-300">Entrega: &lt; 24h</span>
            </div>
            <div className="mt-1 flex gap-1">
              <span className="w-4 h-1.5 rounded-full bg-[#8B7FF5]"></span>
              <span className="w-6 h-1.5 rounded-full bg-[#4BE0E8]"></span>
            </div>
          </div>

          {/* Combined Laptop & Smartphone Mockup Container */}
          <div className="relative flex items-end justify-center">
            
            {/* Smartphone mockup on the left (matching the flyer) */}
            <div className="relative z-20 -mr-6 sm:-mr-10 mb-2 w-28 sm:w-36 h-56 sm:h-72 rounded-[24px] bg-[#0c1024] border-2 border-[#2a3875] p-2 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Notch */}
              <div className="w-12 h-2.5 bg-[#172045] rounded-full mx-auto mb-2"></div>
              {/* Phone screen preview */}
              <div className="flex-1 rounded-xl bg-gradient-to-b from-[#141b3b] to-[#0a0d1f] p-2 flex flex-col justify-between border border-[#232f64]">
                <div className="space-y-1.5">
                  <div className="w-8 h-2 rounded bg-[#4BE0E8]/50"></div>
                  <div className="w-full h-1.5 rounded bg-slate-600"></div>
                  <div className="w-3/4 h-1.5 rounded bg-slate-600"></div>
                </div>
                {/* Glow card inside phone */}
                <div className="h-20 rounded-lg bg-gradient-to-tr from-[#8B7FF5]/40 to-[#4BE0E8]/30 border border-[#4BE0E8]/30 flex items-center justify-center p-1">
                  <span className="text-[9px] font-mono text-[#4BE0E8] font-bold">FORJA MOBILE</span>
                </div>
                <div className="w-full h-3 rounded bg-gradient-to-r from-[#8B7FF5] to-[#4BE0E8]"></div>
              </div>
              {/* Home bar */}
              <div className="w-10 h-1 bg-slate-500 rounded-full mx-auto mt-2"></div>
            </div>

            {/* Laptop mockup (center, matching the flyer) */}
            <div className="relative z-10 w-full max-w-2xl bg-[#0b0e22] rounded-t-2xl border-t-2 border-x-2 border-[#2c3b7a] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-3 sm:p-5">
              
              {/* Top window bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1b2552]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 sm:w-36 h-2 rounded-full bg-[#18214a]"></div>
                </div>
                <div className="w-12 h-3 rounded bg-[#4BE0E8]/30"></div>
              </div>

              {/* Laptop screen interior content matching the image */}
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center min-h-[180px] sm:min-h-[240px]">
                {/* Left content wireframe lines */}
                <div className="col-span-6 text-left space-y-2.5">
                  <div className="w-11/12 h-3.5 sm:h-5 rounded-md bg-[#253268]"></div>
                  <div className="w-3/4 h-2.5 sm:h-3 rounded-md bg-[#19224c]"></div>
                  <div className="w-5/6 h-2.5 sm:h-3 rounded-md bg-[#19224c]"></div>
                  <div className="pt-2">
                    <div className="w-20 sm:w-28 h-6 sm:h-8 rounded-lg bg-gradient-to-r from-[#8B7FF5] to-[#4BE0E8] flex items-center justify-center">
                      <span className="text-[10px] sm:text-xs font-bold text-[#070814]">24H LAUNCH</span>
                    </div>
                  </div>
                </div>

                {/* Right large glowing hero box (as shown in user flyer) */}
                <div className="col-span-6 h-full min-h-[140px] sm:min-h-[190px] rounded-2xl bg-gradient-to-br from-[#8B7FF5]/40 via-[#3a4484]/50 to-[#4BE0E8]/30 border border-[#4BE0E8]/40 p-4 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#4BE0E8] transition-colors">
                  <div className="w-3/4 h-12 rounded-xl bg-[#0b0e22]/60 border border-[#4BE0E8]/30 backdrop-blur-md flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
                      FORJA WEBS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#4BE0E8] mt-2">VELOCIDAD 100/100</span>
                </div>
              </div>

              {/* Bottom 3 feature wireframe boxes (matching the flyer bottom cards) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-3 border-t border-[#172045]">
                <div className="h-6 sm:h-9 rounded-lg bg-[#151c3d] border border-[#232e60] flex items-center justify-center text-[10px] text-slate-400">
                  Landing 24H
                </div>
                <div className="h-6 sm:h-9 rounded-lg bg-[#151c3d] border border-[#232e60] flex items-center justify-center text-[10px] text-slate-400">
                  E-Commerce
                </div>
                <div className="h-6 sm:h-9 rounded-lg bg-[#151c3d] border border-[#232e60] flex items-center justify-center text-[10px] text-slate-400">
                  Web App SaaS
                </div>
              </div>

            </div>

          </div>

          {/* Laptop base shelf */}
          <div className="w-full max-w-3xl mx-auto h-4 bg-gradient-to-b from-[#182046] to-[#0c1024] rounded-b-xl border-b-2 border-x border-[#2c3b7a] shadow-2xl flex items-center justify-center">
            <div className="w-20 h-1 bg-slate-600 rounded-full"></div>
          </div>
        </div>

        {/* Value Proposition Description */}
        <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto mb-8">
          {t.subtitle}
        </p>

        {/* 3 Value Checkpoints with cyan checkmarks matching the flyer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 text-slate-200 font-medium text-sm sm:text-base">
            <div className="w-6 h-6 rounded-full bg-[#4BE0E8]/20 border border-[#4BE0E8] flex items-center justify-center text-[#4BE0E8] shadow-[0_0_10px_rgba(75,224,232,0.4)]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{t.bullet1}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-200 font-medium text-sm sm:text-base">
            <div className="w-6 h-6 rounded-full bg-[#4BE0E8]/20 border border-[#4BE0E8] flex items-center justify-center text-[#4BE0E8] shadow-[0_0_10px_rgba(75,224,232,0.4)]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{t.bullet2}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-200 font-medium text-sm sm:text-base">
            <div className="w-6 h-6 rounded-full bg-[#4BE0E8]/20 border border-[#4BE0E8] flex items-center justify-center text-[#4BE0E8] shadow-[0_0_10px_rgba(75,224,232,0.4)]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{t.bullet3}</span>
          </div>
        </div>

        {/* Kicker from flyer: "HAZ REALIDAD TU IDEA" */}
        <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-400 uppercase font-mono mb-4">
          {t.kicker}
        </p>

        {/* Primary Glowing Button matching flyer: "COTIZA TU PÁGINA WEB" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-2xl text-base sm:text-lg font-extrabold uppercase tracking-wide text-[#070814] gradient-forja-btn shadow-[0_0_35px_rgba(75,224,232,0.5)] hover:shadow-[0_0_50px_rgba(75,224,232,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#070814]" />
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-5 h-5 text-[#070814]" />
          </button>

          <button
            onClick={onScrollToServices}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-[#0e1329] border border-[#232c5c] hover:border-[#4BE0E8]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.ctaSecondary}</span>
          </button>
        </div>

        {/* Delivery Guarantee Banner */}
        <div className="mt-12 pt-8 border-t border-[#172045] flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4BE0E8]" />
            <span>{t.metrics.speed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#8B7FF5]" />
            <span>{t.metrics.projects}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.metrics.satisfaction}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
