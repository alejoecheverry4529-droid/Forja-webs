import React, { useState } from 'react';
import { 
  DollarSign, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Save, 
  TrendingDown, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ServiceProduct, Currency } from '../../types';
import { formatCurrency } from '../../services/i18n';

interface PricingManagerProps {
  services: ServiceProduct[];
  onUpdateServices: (updated: ServiceProduct[]) => void;
  currency: Currency;
}

export const PricingManager: React.FC<PricingManagerProps> = ({
  services,
  onUpdateServices,
  currency,
}) => {
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    services.forEach(s => {
      map[s.id] = s.priceUSD;
    });
    return map;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePriceChange = (id: string, val: number) => {
    setEditedPrices(prev => ({
      ...prev,
      [id]: Math.max(1, val)
    }));
  };

  const handleSaveAll = () => {
    const updated = services.map(s => ({
      ...s,
      priceUSD: editedPrices[s.id] || s.priceUSD
    }));
    onUpdateServices(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Preset 1: Promo Verde / Accesible 24H (similar and lower prices $59 - $129 USD)
  const applyPromoVerdePreset = () => {
    const promoMap: Record<string, number> = {
      'landing-24h': 59,
      'redesign-speed': 69,
      'corporate-pyme': 89,
      'ecommerce-pro': 109,
      'custom-webapp': 129,
    };
    setEditedPrices(promoMap);
    const updated = services.map(s => ({
      ...s,
      priceUSD: promoMap[s.id] || s.priceUSD
    }));
    onUpdateServices(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Preset 2: Ultra Accesible ($49 - $99 USD)
  const applyUltraAccessiblePreset = () => {
    const ultraMap: Record<string, number> = {
      'landing-24h': 49,
      'redesign-speed': 59,
      'corporate-pyme': 75,
      'ecommerce-pro': 89,
      'custom-webapp': 99,
    };
    setEditedPrices(ultraMap);
    const updated = services.map(s => ({
      ...s,
      priceUSD: ultraMap[s.id] || s.priceUSD
    }));
    onUpdateServices(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner explaining the adjustment */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141b3d] to-[#0d1228] border border-[#4BE0E8]/40 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider font-bold">
                Ajuste y Normalización de Costos de Cotización
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Gestor de Tarifas & Precios Accesibles Homogéneos
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Hemos nivelado los costos para eliminar la disparidad previa, agrupándolos en una franja accesible y similar (desde $49 - $129 USD). Puedes personalizar los valores en cualquier momento.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={applyPromoVerdePreset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#141b3b] hover:bg-[#1a234c] text-emerald-300 border border-emerald-500/40 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Promo Verde ($59 - $129 USD)</span>
            </button>

            <button
              onClick={applyUltraAccessiblePreset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#141b3b] hover:bg-[#1a234c] text-[#4BE0E8] border border-[#4BE0E8]/40 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Ultra Accesible ($49 - $99 USD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Price Table */}
      <div className="bg-[#0b0f24] border border-[#1e2754] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0e142e] border-b border-[#1c2552] flex items-center justify-between">
          <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
            Precios Base por Servicio de Desarrollo Web
          </span>
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn shadow-[0_0_15px_rgba(75,224,232,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-[#070814]" /> : <Save className="w-4 h-4 text-[#070814]" />}
            <span>{savedSuccess ? '¡Precios Guardados!' : 'Guardar Todos los Cambios'}</span>
          </button>
        </div>

        <div className="divide-y divide-[#151c3d]">
          {services.map(s => {
            const currentVal = editedPrices[s.id] ?? s.priceUSD;

            return (
              <div key={s.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#101533] transition-colors">
                
                {/* Service info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      SLA {s.deliveryHours}h
                    </span>
                    {s.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#8B7FF5]/20 text-[#8B7FF5] border border-[#8B7FF5]/30">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">{s.shortDesc}</p>
                </div>

                {/* Price input & live conversion */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono block">En tu moneda actual:</span>
                    <span className="text-sm font-bold font-mono text-[#4BE0E8]">
                      {formatCurrency(currentVal, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#080b1a] border border-[#1e2752] rounded-xl px-3 py-1.5">
                    <span className="text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      min={1}
                      max={9999}
                      value={currentVal}
                      onChange={e => handlePriceChange(s.id, Number(e.target.value))}
                      className="w-20 bg-transparent text-sm font-mono font-bold text-white text-right focus:outline-none"
                    />
                    <span className="text-xs font-mono text-slate-400">USD</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0b0e24] border border-[#1e2754] text-xs">
          <span className="text-slate-400 font-mono block mb-1">Landing 24H:</span>
          <span className="text-lg font-black text-emerald-400 font-mono">
            {formatCurrency(editedPrices['landing-24h'] || 59, currency)}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Precio gancho de rápida conversión en 24h.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b0e24] border border-[#1e2754] text-xs">
          <span className="text-slate-400 font-mono block mb-1">Rango Máximo vs Mínimo:</span>
          <span className="text-lg font-black text-[#4BE0E8] font-mono">
            Dif: ${(Math.max(...Object.values(editedPrices)) - Math.min(...Object.values(editedPrices))).toFixed(0)} USD
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Precios equilibrados y altamente competitivos.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b0e24] border border-[#1e2754] text-xs">
          <span className="text-slate-400 font-mono block mb-1">Efecto Inmediato:</span>
          <span className="text-lg font-black text-[#8B7FF5] font-mono">100% Sincronizado</span>
          <p className="text-[11px] text-slate-400 mt-1">Se actualiza en el cotizador, catálogo y WhatsApp.</p>
        </div>
      </div>

    </div>
  );
};
