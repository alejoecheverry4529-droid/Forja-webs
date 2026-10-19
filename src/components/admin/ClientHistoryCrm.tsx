import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Plus, 
  Tag, 
  Calendar, 
  DollarSign, 
  FolderGit2, 
  Star,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ClientProfile, BookingRequest, Currency } from '../../types';
import { formatCurrency } from '../../services/i18n';

interface ClientHistoryCrmProps {
  clients: ClientProfile[];
  bookings: BookingRequest[];
  currency: Currency;
  onAddClientNote: (clientId: string, noteText: string) => void;
}

export const ClientHistoryCrm: React.FC<ClientHistoryCrmProps> = ({
  clients,
  bookings,
  currency,
  onAddClientNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(clients[0] || null);
  const [newNoteText, setNewNoteText] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newNoteText.trim()) return;
    onAddClientNote(selectedClient.id, newNoteText);
    setNewNoteText('');
  };

  const getStatusBadge = (status: ClientProfile['status']) => {
    switch (status) {
      case 'vip':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8B7FF5]/20 text-[#8B7FF5] border border-[#8B7FF5]/40">VIP CLIENT</span>;
      case 'active':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">ACTIVO</span>;
      case 'lead':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">PROSPECTO</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400">INACTIVO</span>;
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const text = encodeURIComponent(`Hola ${name}, te saludamos desde FORJA WEBS. ¿Cómo va todo con tu proyecto web?`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar por cliente, empresa, WhatsApp..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-[#0d1127] border border-[#1e2752] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4BE0E8]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Client List */}
        <div className="lg:col-span-5 space-y-3 max-h-[650px] overflow-y-auto pr-1">
          {filteredClients.map(client => {
            const isSelected = selectedClient?.id === client.id;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#141b3d] border-[#4BE0E8] shadow-[0_0_20px_rgba(75,224,232,0.15)]'
                    : 'bg-[#0b0e24] border-[#1c244c] hover:border-[#2b376d]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-11 h-11 rounded-xl object-cover border border-[#283670]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white truncate">{client.name}</h4>
                      {getStatusBadge(client.status)}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{client.company} · {client.country}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#172147] text-[11px] font-mono">
                      <span className="text-slate-400">{client.bookingsCount} proyectos</span>
                      <span className="text-[#4BE0E8] font-bold">
                        {formatCurrency(client.totalSpentUSD, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Client History Detail Card */}
        {selectedClient ? (
          <div className="lg:col-span-7 bg-[#0b0e24] border border-[#1e2754] rounded-3xl p-6 shadow-xl space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1b234a]">
              <div className="flex items-center gap-4">
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#4BE0E8]/40 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedClient.name}</h3>
                    {getStatusBadge(selectedClient.status)}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{selectedClient.company}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{selectedClient.email} · {selectedClient.phone}</p>
                </div>
              </div>

              <button
                onClick={() => openWhatsApp(selectedClient.phone, selectedClient.name)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070814] font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Directo</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0e132e] border border-[#1d2754] text-center font-mono">
                <span className="text-[10px] text-slate-400 uppercase">Facturado</span>
                <p className="text-sm sm:text-base font-extrabold text-[#4BE0E8]">
                  {formatCurrency(selectedClient.totalSpentUSD, currency)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0e132e] border border-[#1d2754] text-center font-mono">
                <span className="text-[10px] text-slate-400 uppercase">Total Reservas</span>
                <p className="text-sm sm:text-base font-extrabold text-white">
                  {selectedClient.bookingsCount}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0e132e] border border-[#1d2754] text-center font-mono">
                <span className="text-[10px] text-slate-400 uppercase">Primer Contacto</span>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">
                  {selectedClient.firstContactDate}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Etiquetas de Perfil
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedClient.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-[#141b3b] border border-[#232f64] text-xs font-mono text-[#8B7FF5]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Associated Booking History */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Historial de Sitios Web Contratados
              </span>
              <div className="space-y-2">
                {bookings
                  .filter(b => b.clientEmail === selectedClient.email || selectedClient.associatedBookingIds.includes(b.id))
                  .map(bk => (
                    <div key={bk.id} className="p-3 rounded-xl bg-[#0e1329] border border-[#1c244c] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{bk.serviceName}</span>
                          <span className="font-mono text-[#4BE0E8] text-[10px]">({bk.id})</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">SLA: {bk.deliverySpeed === '24h' ? '24 Horas' : 'Estándar'} · {bk.targetDate}</p>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-white">{formatCurrency(bk.estimatedTotalUSD, currency)}</span>
                        <div className="text-[10px] text-emerald-400">{bk.status}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Internal Staff Notes Timeline */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Bitácora de Notas Internas del Equipo
              </span>
              
              <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                {selectedClient.internalNotes.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No hay notas registradas para este cliente.</p>
                ) : (
                  selectedClient.internalNotes.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#0d1127] border border-[#1a224a] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-[#8B7FF5] font-semibold">{n.author}</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-slate-300">{n.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribir nota interna sobre requerimientos del cliente..."
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  className="flex-1 bg-[#0d1127] border border-[#1e2752] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#141b3b] hover:bg-[#1a234c] text-[#4BE0E8] border border-[#27346d] text-xs font-bold transition-colors cursor-pointer"
                >
                  Guardar Nota
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-7 p-12 text-center text-slate-500 text-xs">
            Selecciona un cliente para inspeccionar su historial.
          </div>
        )}

      </div>
    </div>
  );
};
