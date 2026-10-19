import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ShoppingBag, 
  Building2, 
  Cpu, 
  RotateCw,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ServiceProduct, Language, Currency } from '../types';
import { translations, formatCurrency } from '../services/i18n';

interface ProductCatalogProps {
  services: ServiceProduct[];
  language: Language;
  currency: Currency;
  onSelectServiceForQuote: (service: ServiceProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  services,
  language,
  currency,
  onSelectServiceForQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailModalService, setDetailModalService] = useState<ServiceProduct | null>(null);

  const t = translations[language].services;

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'landing':
        return <Zap className="w-5 h-5 text-[#4BE0E8]" />;
      case 'ecommerce':
        return <ShoppingBag className="w-5 h-5 text-[#8B7FF5]" />;
      case 'corporate':
        return <Building2 className="w-5 h-5 text-emerald-400 text-[#4BE0E8]" />;
      case 'custom_app':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'redesign':
        return <RotateCw className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-[#4BE0E8]" />;
    }
  };

  return (
    <section id="servicios" className="py-20 relative bg-[#070814] border-t border-[#151c3d]">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4BE0E8]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#8B7FF5]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121838] border border-[#232c5e] text-xs font-mono text-[#4BE0E8] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CATÁLOGO DE INGENIERÍA WEB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-[#0c1024] border border-[#1e2752] rounded-2xl max-w-fit mx-auto">
            {[
              { id: 'all', label: 'Todos los Servicios' },
              { id: 'landing', label: '⚡ Landing Express 24H' },
              { id: 'ecommerce', label: '🛍️ E-Commerce' },
              { id: 'corporate', label: '🏢 Corporativa & Pyme' },
              { id: 'custom_app', label: '⚙️ Web App / SaaS' },
              { id: 'redesign', label: '🔄 Rediseño 24H' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#8B7FF5]/20 to-[#4BE0E8]/20 text-[#4BE0E8] border border-[#4BE0E8]/40 shadow-[0_0_15px_rgba(75,224,232,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-[#121838]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => {
            const is24h = service.deliveryHours === 24;

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  service.popular
                    ? 'gradient-forja-card border-[#4BE0E8]/40 shadow-[0_0_30px_rgba(75,224,232,0.15)] ring-1 ring-[#4BE0E8]/30'
                    : 'bg-[#0d1127] border border-[#1d2650] hover:border-[#4BE0E8]/40 hover:shadow-xl'
                }`}
              >
                {/* Popular / 24H Badge */}
                {service.badge && (
                  <div className="absolute -top-3.5 right-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase font-mono shadow-md ${
                      is24h
                        ? 'bg-gradient-to-r from-[#4BE0E8] to-[#8B7FF5] text-[#070814]'
                        : 'bg-[#1e2754] text-[#4BE0E8] border border-[#4BE0E8]/30'
                    }`}>
                      {service.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Service Icon & Delivery SLA */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#141b3b] border border-[#26336b] shadow-inner">
                      {getServiceIcon(service.category)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.deliveryHours}h SLA</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#4BE0E8] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Pricing Display */}
                  <div className="p-4 rounded-2xl bg-[#090c1f] border border-[#1b234a] mb-6">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400 font-mono">Inversión:</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {formatCurrency(service.priceUSD, currency)}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#4BE0E8] font-mono mt-1 flex items-center justify-between">
                      <span>✓ Entrega garantizada</span>
                      <span>✓ Dominio & SSL gratis</span>
                    </div>
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#4BE0E8] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2.5 pt-4 border-t border-[#192147]">
                  <button
                    onClick={() => onSelectServiceForQuote(service)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#070814] gradient-forja-btn shadow-[0_0_20px_rgba(75,224,232,0.3)] hover:shadow-[0_0_30px_rgba(75,224,232,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.bookNow}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDetailModalService(service)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#0f142e] hover:bg-[#161d42] border border-[#1e2752] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-[#8B7FF5]" />
                    <span>{t.viewDetails}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Service Specs Modal */}
        {detailModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#0b0f24] border border-[#27346d] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              
              <div className="flex items-start justify-between pb-4 border-b border-[#1b234a]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider">
                      Ficha Técnica Completa
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Entrega: {detailModalService.includedSpecs.deliveryTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{detailModalService.title}</h3>
                </div>
                <button
                  onClick={() => setDetailModalService(null)}
                  className="w-8 h-8 rounded-full bg-[#141b3b] text-slate-400 hover:text-white flex items-center justify-center border border-[#222c5e]"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Descripción Detallada</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {detailModalService.detailedDesc}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e142e] border border-[#212c5c]">
                  <h4 className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider mb-3">
                    {t.includedTitle}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Diseño Responsive: Sí</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Optimización SEO Google: Sí</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Hosting: {detailModalService.includedSpecs.hostingIncluded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Dominio propio gratis 1 año</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Botón flotante a WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4BE0E8]" />
                      <span>Certificado SSL Seguro</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {t.techStackTitle}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detailModalService.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-[#141b3b] border border-[#27346d] text-xs font-mono text-[#8B7FF5]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141b3b] to-[#0d1228] border border-[#4BE0E8]/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-mono">Precio Total Paquete</p>
                    <p className="text-2xl font-black text-white font-mono">
                      {formatCurrency(detailModalService.priceUSD, currency)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const s = detailModalService;
                      setDetailModalService(null);
                      onSelectServiceForQuote(s);
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#070814] gradient-forja-btn shadow-lg"
                  >
                    Cotizar Ahora en 24H
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
