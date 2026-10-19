import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  DollarSign, 
  MoreVertical,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { BookingRequest, BookingStatus, PaymentStatus, TeamMember, Language, Currency } from '../../types';
import { formatCurrency, translations } from '../../services/i18n';

interface LiveBookingsTableProps {
  bookings: BookingRequest[];
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  onUpdatePayment: (bookingId: string, paymentStatus: PaymentStatus) => void;
  onAssignStaff: (bookingId: string, staffId: string) => void;
  teamMembers: TeamMember[];
  currency: Currency;
  language: Language;
  onSimulateBooking: () => void;
  onInspectCrypto: (booking: BookingRequest) => void;
}

export const LiveBookingsTable: React.FC<LiveBookingsTableProps> = ({
  bookings,
  onUpdateStatus,
  onUpdatePayment,
  onAssignStaff,
  teamMembers,
  currency,
  language,
  onSimulateBooking,
  onInspectCrypto,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<BookingRequest | null>(null);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'in_development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#4BE0E8]/15 text-[#4BE0E8] border border-[#4BE0E8]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4BE0E8] animate-ping"></span>
            En Desarrollo 24H
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Aprobada
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Entregada Satisfactoriamente
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Pendiente Revisión
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-red-500/15 text-red-400 border border-red-500/30">
            Cancelada
          </span>
        );
      default:
        return null;
    }
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'full_paid':
        return <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Pagado</span>;
      case 'deposit_paid':
        return <span className="text-[11px] font-mono text-[#4BE0E8] font-bold">Anticipo 50%</span>;
      case 'unpaid':
        return <span className="text-[11px] font-mono text-amber-400 font-medium">Sin Pagar</span>;
    }
  };

  const openWhatsAppToClient = (b: BookingRequest) => {
    const cleanPhone = b.clientPhone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `¡Hola ${b.clientName}! 👋 Te escribimos desde FORJA WEBS respecto a tu solicitud #${b.id} para "${b.serviceName}". Estamos listos para comenzar tu desarrollo.`
    );
    window.open(`https://wa.me/${cleanPhone || '573000000000'}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top action toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cliente, empresa, ticket o servicio..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4BE0E8]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'pending', label: 'Pendientes' },
            { id: 'in_development', label: '⚡ Desarrollo 24h' },
            { id: 'completed', label: 'Finalizadas' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === f.id
                  ? 'bg-[#4BE0E8]/20 text-[#4BE0E8] border border-[#4BE0E8]/40'
                  : 'bg-[#0d1127] text-slate-400 hover:text-white border border-[#1e2752]'
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Real-time simulation button */}
          <button
            onClick={onSimulateBooking}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#070814] gradient-forja-btn shadow-[0_0_15px_rgba(75,224,232,0.3)] hover:shadow-[0_0_25px_rgba(75,224,232,0.5)] transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
            title="Generar nueva solicitud instantánea para probar notificaciones y sonido"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Simular Reserva en Vivo</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#0b0f24] border border-[#1c244c] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e142e] border-b border-[#1c2552] text-slate-400 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Ticket / Fecha</th>
                <th className="py-3.5 px-4">Cliente / Empresa</th>
                <th className="py-3.5 px-4">Servicio Solicitado</th>
                <th className="py-3.5 px-4">SLA Entrega</th>
                <th className="py-3.5 px-4">Inversión</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4">Asignado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151c3d] text-slate-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron solicitudes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => {
                  const assignedMember = teamMembers.find(m => m.id === b.assignedStaffId);
                  
                  return (
                    <tr key={b.id} className="hover:bg-[#101633] transition-colors">
                      {/* Ticket & Date */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-[#4BE0E8]">{b.id}</span>
                        <div className="text-[10px] text-slate-400">{b.createdAt.slice(0, 10)}</div>
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{b.clientName}</div>
                        <div className="text-[10px] text-slate-400">{b.companyName}</div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium">{b.serviceName}</div>
                        <div className="text-[10px] text-slate-400">{b.selectedAddons.length} addons</div>
                      </td>

                      {/* SLA Delivery */}
                      <td className="py-3.5 px-4 font-mono">
                        {b.deliverySpeed === '24h' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            24 Horas
                          </span>
                        ) : (
                          <span className="text-slate-400">Estándar</span>
                        )}
                        <div className="text-[10px] text-slate-500">{b.targetDate}</div>
                      </td>

                      {/* Amount & Payment */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-white">{formatCurrency(b.estimatedTotalUSD, currency)}</div>
                        <div>{getPaymentBadge(b.paymentStatus)}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(b.status)}
                      </td>

                      {/* Assigned Staff */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.assignedStaffId || ''}
                          onChange={e => onAssignStaff(b.id, e.target.value)}
                          className="bg-[#0d1228] border border-[#1e2752] rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-[#4BE0E8]"
                        >
                          <option value="">Sin Asignar</option>
                          {teamMembers.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name.split(' ')[0]} ({m.role})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Direct */}
                          <button
                            onClick={() => openWhatsAppToClient(b)}
                            className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-[#070814] transition-colors"
                            title="Contactar al cliente por WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Change Status Dropdown */}
                          <select
                            value={b.status}
                            onChange={e => onUpdateStatus(b.id, e.target.value as BookingStatus)}
                            className="bg-[#0e142e] border border-[#232c5e] text-slate-300 rounded-lg px-2 py-1 text-[10px] focus:outline-none"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="in_development">⚡ Desarrollo 24H</option>
                            <option value="approved">Aprobada</option>
                            <option value="completed">Finalizada</option>
                            <option value="cancelled">Cancelada</option>
                          </select>

                          {/* Inspect Crypto Payload */}
                          <button
                            onClick={() => onInspectCrypto(b)}
                            className="p-1.5 rounded-lg bg-[#141b3b] border border-[#27346d] text-[#8B7FF5] hover:text-white transition-colors"
                            title="Ver Hash Criptográfico E2EE"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </button>

                          {/* View Full Detail Modal */}
                          <button
                            onClick={() => setSelectedBookingDetail(b)}
                            className="p-1.5 rounded-lg bg-[#141b3b] border border-[#27346d] text-slate-300 hover:text-white transition-colors"
                            title="Ver Detalle Completo"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBookingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0e24] border border-[#232d64] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-[#1a234c]">
              <div>
                <span className="text-xs font-mono text-[#4BE0E8] font-bold">Ticket #{selectedBookingDetail.id}</span>
                <h3 className="text-xl font-black text-white">{selectedBookingDetail.serviceName}</h3>
              </div>
              <button
                onClick={() => setSelectedBookingDetail(null)}
                className="w-8 h-8 rounded-full bg-[#141b3b] text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0e132e] border border-[#1c2650]">
                <div>
                  <span className="text-slate-400 block">Cliente:</span>
                  <span className="font-bold text-white">{selectedBookingDetail.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Empresa:</span>
                  <span className="text-white">{selectedBookingDetail.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Correo:</span>
                  <span className="text-[#4BE0E8]">{selectedBookingDetail.clientEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Teléfono:</span>
                  <span className="text-white">{selectedBookingDetail.clientPhone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Notas del Proyecto:</span>
                <p className="p-3 rounded-xl bg-[#0e132e] border border-[#1c2650] text-slate-300">
                  {selectedBookingDetail.projectNotes || 'Sin notas adicionales.'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Addons Seleccionados:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBookingDetail.selectedAddons.map((ad, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[#141c3d] border border-[#222c5e] text-[#8B7FF5] font-mono text-[11px]">
                      {ad}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0d20] border border-[#1a234c] font-mono">
                <span className="text-slate-400">Total Cotizado:</span>
                <span className="text-lg font-black text-[#4BE0E8]">
                  {formatCurrency(selectedBookingDetail.estimatedTotalUSD, currency)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a234c] flex justify-end gap-2">
              <button
                onClick={() => openWhatsAppToClient(selectedBookingDetail)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070814] font-bold text-xs flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contactar por WhatsApp</span>
              </button>
              <button
                onClick={() => setSelectedBookingDetail(null)}
                className="px-4 py-2 rounded-xl bg-[#141b3b] text-slate-300 hover:text-white text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
