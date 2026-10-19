import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock, 
  ArrowUpRight, 
  Download, 
  PieChart, 
  BarChart3,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DailySalesStat, BookingRequest, Currency } from '../../types';
import { formatCurrency } from '../../services/i18n';

interface AnalyticsPanelProps {
  stats: DailySalesStat[];
  bookings: BookingRequest[];
  currency: Currency;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  stats,
  bookings,
  currency,
}) => {
  const [hoveredDay, setHoveredDay] = useState<DailySalesStat | null>(null);

  // Financial aggregates
  const totalRevenue = stats.reduce((acc, s) => acc + s.revenueUSD, 0);
  const totalBookings = stats.reduce((acc, s) => acc + s.bookingsCount, 0);
  const totalCompleted = stats.reduce((acc, s) => acc + s.completedProjects, 0);
  const totalLeads = stats.reduce((acc, s) => acc + s.leadsCount, 0);
  const avgTicket = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;
  const conversionRate = totalLeads > 0 ? ((totalBookings / totalLeads) * 100).toFixed(1) : '32.4';
  const todayStat = stats[stats.length - 1];

  // SVG Chart Dimensions
  const maxRevenue = Math.max(...stats.map(s => s.revenueUSD), 1);
  const chartHeight = 160;
  const chartWidth = 720;
  const stepX = chartWidth / (stats.length - 1 || 1);

  // Generate SVG path for the area chart
  const points = stats.map((stat, idx) => {
    const x = idx * stepX;
    const y = chartHeight - (stat.revenueUSD / maxRevenue) * (chartHeight - 30);
    return `${x},${y}`;
  });

  const pathD = `M 0,${chartHeight} L ${points.join(' L ')} L ${chartWidth},${chartHeight} Z`;
  const lineD = `M ${points.join(' L ')}`;

  const exportCSV = () => {
    const headers = 'Fecha,Dia,VentasUSD,Reservas,Completados,Leads\n';
    const rows = stats.map(s => `${s.date},${s.dayLabel},${s.revenueUSD},${s.bookingsCount},${s.completedProjects},${s.leadsCount}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `forja_webs_ventas_diarias_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#0c1026] border border-[#1e2752] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Fondo de Ingresos</span>
            <div className="p-1.5 rounded-lg bg-[#4BE0E8]/10 text-[#4BE0E8]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(totalRevenue, currency)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.6% vs mes anterior</span>
          </div>
        </div>

        {/* KPI 2: Today Sales */}
        <div className="p-5 rounded-2xl bg-[#0c1026] border border-[#1e2752] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Ventas de Hoy</span>
            <div className="p-1.5 rounded-lg bg-[#8B7FF5]/10 text-[#8B7FF5]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(todayStat?.revenueUSD || 0, currency)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#4BE0E8] font-mono mt-2">
            <span>{todayStat?.bookingsCount || 0} nuevas reservas cerradas</span>
          </div>
        </div>

        {/* KPI 3: Average Ticket */}
        <div className="p-5 rounded-2xl bg-[#0c1026] border border-[#1e2752] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Ticket Promedio</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(avgTicket, currency)}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-2">
            <span>Tasa conversión: {conversionRate}%</span>
          </div>
        </div>

        {/* KPI 4: 24h SLA Fulfillment */}
        <div className="p-5 rounded-2xl bg-[#0c1026] border border-[#1e2752] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Cumplimiento 24H SLA</span>
            <div className="p-1.5 rounded-lg bg-[#4BE0E8]/10 text-[#4BE0E8]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
            99.4%
          </div>
          <div className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tiempo prom: 18.2 horas</span>
          </div>
        </div>

      </div>

      {/* Interactive Sales Chart Card */}
      <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4BE0E8] animate-pulse"></span>
              <h3 className="text-lg font-bold text-white">Curva de Facturación Diaria (Últimos 14 Días)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Monitoreo en tiempo real de ingresos generados por reservas de sitios web.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hoveredDay && (
              <div className="px-3 py-1 rounded-lg bg-[#141b3b] border border-[#26346e] text-xs font-mono text-[#4BE0E8]">
                {hoveredDay.dayLabel}: {formatCurrency(hoveredDay.revenueUSD, currency)} ({hoveredDay.bookingsCount} reservas)
              </div>
            )}
            <button
              onClick={exportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-[#121838] hover:bg-[#18204a] text-slate-200 border border-[#232f64] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#4BE0E8]" />
              <span>Exportar Reporte CSV</span>
            </button>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-44 sm:h-56 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4BE0E8" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#8B7FF5" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0b0e24" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * (1 - ratio)}
                x2={chartWidth}
                y2={chartHeight * (1 - ratio)}
                stroke="#172044"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}

            {/* Filled Area */}
            <path d={pathD} fill="url(#revenueGradient)" />

            {/* Stroke line */}
            <path
              d={lineD}
              fill="none"
              stroke="#4BE0E8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {stats.map((stat, idx) => {
              const cx = idx * stepX;
              const cy = chartHeight - (stat.revenueUSD / maxRevenue) * (chartHeight - 30);
              const isHovered = hoveredDay?.date === stat.date;

              return (
                <g key={stat.date}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#8B7FF5' : '#4BE0E8'}
                    stroke="#0b0e24"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredDay(stat)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-mono px-1">
            {stats.map((s, idx) => (
              <span key={s.date} className={idx % 2 === 0 ? 'opacity-100' : 'hidden sm:inline-block'}>
                {s.dayLabel}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Acquisition Channels */}
        <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754]">
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#4BE0E8]" />
            <span>Canales de Adquisición de Clientes</span>
          </h4>
          <div className="space-y-3">
            {[
              { name: 'WhatsApp Directo & Campañas', share: 48, leads: '182 clientes', color: 'bg-emerald-400' },
              { name: 'Google Search Orgánico (SEO)', share: 26, leads: '98 clientes', color: 'bg-[#4BE0E8]' },
              { name: 'Instagram & Redes Sociales', share: 16, leads: '61 clientes', color: 'bg-[#8B7FF5]' },
              { name: 'Referidos & Boca a Boca', share: 10, leads: '38 clientes', color: 'bg-amber-400' },
            ].map(channel => (
              <div key={channel.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{channel.name}</span>
                  <span className="font-mono text-slate-400">{channel.share}% ({channel.leads})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#131938] overflow-hidden">
                  <div className={`h-full ${channel.color}`} style={{ width: `${channel.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Demand Distribution */}
        <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754]">
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#8B7FF5]" />
            <span>Distribución de Servicios Más Solicitados</span>
          </h4>
          <div className="space-y-3">
            {[
              { name: '⚡ Landing Page Express 24H', percent: 52, badge: 'Líder Absoluto' },
              { name: '🛍️ E-Commerce & Tienda Online', percent: 24, badge: 'Ticket Alto' },
              { name: '🏢 Web Corporativa & Pyme', percent: 14, badge: 'Estabilidad' },
              { name: '⚙️ Web App / SaaS a Medida', percent: 10, badge: 'Enterprise' },
            ].map(srv => (
              <div key={srv.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1329] border border-[#1c244c] text-xs">
                <div>
                  <span className="font-medium text-slate-200">{srv.name}</span>
                  <div className="text-[10px] text-[#4BE0E8] font-mono">{srv.badge}</div>
                </div>
                <span className="text-base font-bold font-mono text-white">{srv.percent}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
