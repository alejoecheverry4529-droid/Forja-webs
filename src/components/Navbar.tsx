import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Globe, 
  DollarSign, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Language, Currency, PushNotification, TeamMember } from '../types';
import { translations } from '../services/i18n';
import { notificationService } from '../services/notifications';

interface NavbarProps {
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  notifications: PushNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  onOpenQuoteModal: () => void;
  activeMember: TeamMember;
  teamMembers: TeamMember[];
  onSelectTeamMember: (member: TeamMember) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  language,
  setLanguage,
  currency,
  setCurrency,
  notifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  onOpenQuoteModal,
  activeMember,
  teamMembers,
  onSelectTeamMember,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [soundActive, setSoundActive] = useState(notificationService.isSoundEnabled());

  const t = translations[language];
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSound = () => {
    const next = !soundActive;
    notificationService.setSoundEnabled(next);
    setSoundActive(next);
    if (next) {
      notificationService.playBookingChime();
    }
  };

  const requestPush = async () => {
    const granted = await notificationService.requestPushPermission();
    if (granted) {
      notificationService.sendBrowserNotification(
        '🔔 Notificaciones Push Activas',
        'Recibirás alertas en tiempo real de cada nueva reserva de página web.'
      );
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070814]/85 border-b border-[#1b2246]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching the uploaded flyer */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('public')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B7FF5] to-[#4BE0E8] p-[2px] shadow-[0_0_20px_rgba(75,224,232,0.4)]">
            <div className="w-full h-full bg-[#070814] rounded-[10px] flex items-center justify-center">
              {/* Geometric emblem representing the FORJA icon */}
              <div className="w-5 h-5 rounded-[4px] border-2 border-[#4BE0E8] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#8B7FF5]"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-wider text-white">FORJA</span>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-[#4BE0E8] to-[#8B7FF5] bg-clip-text text-transparent">WEBS</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Páginas Web 24H</p>
          </div>
        </div>

        {/* Center navigation for public view */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">
            {t.nav.services}
          </a>
          <a href="#garantia-24h" className="hover:text-[#4BE0E8] transition-colors flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Garantía 24h
          </a>
          <a href="#proceso" className="hover:text-[#4BE0E8] transition-colors">
            Cómo Funciona
          </a>
          <a href="#seguridad-e2ee" className="hover:text-[#4BE0E8] transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#4BE0E8]" />
            {t.nav.security}
          </a>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-3">
          
          {/* Currency selector */}
          <div className="relative hidden sm:flex items-center bg-[#0d1228] border border-[#1e2752] rounded-lg p-1 text-xs">
            {(['USD', 'COP', 'EUR', 'MXN'] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2 py-1 rounded transition-colors font-mono font-medium ${
                  currency === cur
                    ? 'bg-[#4BE0E8]/20 text-[#4BE0E8] border border-[#4BE0E8]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          {/* Language selector */}
          <div className="flex items-center bg-[#0d1228] border border-[#1e2752] rounded-lg p-1 text-xs">
            {(['es', 'en', 'pt'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded uppercase font-mono font-medium transition-colors ${
                  language === lang
                    ? 'bg-[#8B7FF5]/20 text-[#8B7FF5] border border-[#8B7FF5]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Real-time Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-[#0d1228] border border-[#1e2752] hover:border-[#4BE0E8]/40 text-slate-300 hover:text-white transition-colors"
              title="Centro de Notificaciones en Vivo"
              aria-label="Centro de Notificaciones"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0c1024] border border-[#232c5c] shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#1b2246]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">Notificaciones en Vivo</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Push Activo
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleSound}
                      className="p-1 rounded text-slate-400 hover:text-white"
                      title={soundActive ? 'Silenciar alertas' : 'Activar sonido'}
                    >
                      {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#4BE0E8]" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-[#4BE0E8] hover:underline"
                      >
                        Leídas
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications list */}
                <div className="max-h-72 overflow-y-auto divide-y divide-[#151c3d] my-2">
                  {notifications.length === 0 ? (
                    <p className="py-6 text-center text-xs text-slate-400">Sin notificaciones pendientes</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                          notif.read ? 'opacity-65 hover:bg-[#121838]' : 'bg-[#151d45]/60 hover:bg-[#192352]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-100">{notif.title}</p>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-[#1b2246] flex items-center justify-between text-xs text-slate-400">
                  <button 
                    onClick={requestPush} 
                    className="text-[#4BE0E8] hover:underline text-xs flex items-center gap-1"
                  >
                    <span>Permitir alertas de escritorio</span>
                  </button>
                  <button
                    onClick={() => {
                      notificationService.playBookingChime();
                    }}
                    className="text-slate-400 hover:text-white text-[11px]"
                  >
                    Probar Chime 🔔
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Toggle View: Public Website vs Admin Panel */}
          <button
            onClick={() => setCurrentView(currentView === 'public' ? 'admin' : 'public')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              currentView === 'admin'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#121736] text-slate-200 border-[#232d61] hover:border-[#4BE0E8]/50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4BE0E8]" />
            <span>{currentView === 'admin' ? t.nav.clientView : t.nav.admin}</span>
          </button>

          {/* Active Role Selector dropdown (Admin / Super Admin / Asesor) */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0d1228] border border-[#1e2752] text-xs text-slate-300 hover:text-white"
            >
              <img src={activeMember.avatar} alt={activeMember.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="max-w-[100px] truncate">{activeMember.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0c1024] border border-[#232c5c] shadow-2xl p-2 z-50">
                <p className="text-[11px] font-mono text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Cambiar Rol de Usuario
                </p>
                {teamMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => {
                      onSelectTeamMember(member);
                      setShowRoleSelector(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeMember.id === member.id
                        ? 'bg-[#1e2754] text-white font-medium'
                        : 'text-slate-300 hover:bg-[#121838]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                      <div className="text-left">
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{member.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                    {activeMember.id === member.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#4BE0E8]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button matching image flyer */}
          <button
            onClick={onOpenQuoteModal}
            className="gradient-forja-btn text-[#070814] font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(75,224,232,0.4)] hover:shadow-[0_0_30px_rgba(75,224,232,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.bookCall}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
