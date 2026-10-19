import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Lock, 
  CreditCard, 
  Sparkles,
  ArrowLeft,
  Bell,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  DollarSign
} from 'lucide-react';
import { 
  BookingRequest, 
  BookingStatus, 
  PaymentStatus, 
  ClientProfile, 
  TeamMember, 
  UserRole, 
  DailySalesStat, 
  Language, 
  Currency 
} from '../../types';
import { translations, formatCurrency } from '../../services/i18n';
import { LiveBookingsTable } from './LiveBookingsTable';
import { AnalyticsPanel } from './AnalyticsPanel';
import { ClientHistoryCrm } from './ClientHistoryCrm';
import { TeamRolesManager } from './TeamRolesManager';
import { CryptoVaultAndReports } from './CryptoVaultAndReports';
import { IntegrationsManager } from './IntegrationsManager';
import { PricingManager } from './PricingManager';
import { ServiceProduct } from '../../types';

interface AdminDashboardProps {
  bookings: BookingRequest[];
  clients: ClientProfile[];
  teamMembers: TeamMember[];
  activeMember: TeamMember;
  dailyStats: DailySalesStat[];
  services: ServiceProduct[];
  language: Language;
  currency: Currency;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onUpdatePaymentStatus: (bookingId: string, paymentStatus: PaymentStatus) => void;
  onAssignStaff: (bookingId: string, staffId: string) => void;
  onAddClientNote: (clientId: string, noteText: string) => void;
  onUpdateMemberRole: (memberId: string, role: UserRole) => void;
  onTogglePermission: (memberId: string, permissionKey: keyof TeamMember['permissions']) => void;
  onAddTeamMember: (newMember: Omit<TeamMember, 'id'>) => void;
  onUpdateServices: (services: ServiceProduct[]) => void;
  onSimulateBooking: () => void;
  onBackToClientView: () => void;
  onInspectCrypto: (booking: BookingRequest) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  clients,
  teamMembers,
  activeMember,
  dailyStats,
  services,
  language,
  currency,
  onUpdateBookingStatus,
  onUpdatePaymentStatus,
  onAssignStaff,
  onAddClientNote,
  onUpdateMemberRole,
  onTogglePermission,
  onAddTeamMember,
  onUpdateServices,
  onSimulateBooking,
  onBackToClientView,
  onInspectCrypto,
}) => {
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'analytics' | 'pricing' | 'clients' | 'roles' | 'crypto' | 'integrations'
  >('bookings');

  const t = translations[language].admin;

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const inDevCount = bookings.filter(b => b.status === 'in_development').length;

  return (
    <div className="min-h-screen bg-[#070814] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header of Admin Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#182147]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToClientView}
                className="p-1.5 rounded-lg bg-[#0e1329] border border-[#1e2752] text-slate-400 hover:text-white transition-colors"
                title="Volver al Sitio Público"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#4BE0E8]/20 text-[#4BE0E8] border border-[#4BE0E8]/40">
                LIVE 24H
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.subtitle} · Sesión actual: <span className="text-white font-semibold">{activeMember.name}</span> ({activeMember.role})
            </p>
          </div>

          {/* Quick Real-Time Simulation and Live Alerts */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSimulateBooking}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn shadow-[0_0_20px_rgba(75,224,232,0.4)] hover:shadow-[0_0_30px_rgba(75,224,232,0.6)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.simulateNewBooking}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#161d40]">
          {[
            { id: 'bookings', label: t.tabBookings, icon: Clock, count: inDevCount > 0 ? inDevCount : undefined, pulse: inDevCount > 0 },
            { id: 'analytics', label: t.tabAnalytics, icon: BarChart3 },
            { id: 'pricing', label: 'Tarifas & Costos', icon: DollarSign },
            { id: 'clients', label: t.tabClients, icon: Users },
            { id: 'roles', label: t.tabTeam, icon: SlidersHorizontal },
            { id: 'crypto', label: t.tabSecurity, icon: Lock },
            { id: 'integrations', label: t.tabIntegrations, icon: CreditCard },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#151c3d] text-[#4BE0E8] border border-[#4BE0E8]/40 shadow-[0_0_15px_rgba(75,224,232,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-[#0e1227]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4BE0E8]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    tab.pulse ? 'bg-[#4BE0E8] text-[#070814] animate-pulse' : 'bg-[#1a234a] text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div>
          {activeTab === 'bookings' && (
            <LiveBookingsTable
              bookings={bookings}
              onUpdateStatus={onUpdateBookingStatus}
              onUpdatePayment={onUpdatePaymentStatus}
              onAssignStaff={onAssignStaff}
              teamMembers={teamMembers}
              currency={currency}
              language={language}
              onSimulateBooking={onSimulateBooking}
              onInspectCrypto={onInspectCrypto}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPanel
              stats={dailyStats}
              bookings={bookings}
              currency={currency}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingManager
              services={services}
              onUpdateServices={onUpdateServices}
              currency={currency}
            />
          )}

          {activeTab === 'clients' && (
            <ClientHistoryCrm
              clients={clients}
              bookings={bookings}
              currency={currency}
              onAddClientNote={onAddClientNote}
            />
          )}

          {activeTab === 'roles' && (
            <TeamRolesManager
              teamMembers={teamMembers}
              activeMember={activeMember}
              onUpdateMemberRole={onUpdateMemberRole}
              onTogglePermission={onTogglePermission}
              onAddTeamMember={onAddTeamMember}
            />
          )}

          {activeTab === 'crypto' && (
            <CryptoVaultAndReports
              bookings={bookings}
              clients={clients}
              stats={dailyStats}
            />
          )}

          {activeTab === 'integrations' && (
            <IntegrationsManager />
          )}
        </div>

      </div>
    </div>
  );
};
