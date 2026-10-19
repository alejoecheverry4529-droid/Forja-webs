import React from 'react';
import { 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { Language } from '../types';

interface ProcessAndGuaranteeSectionProps {
  language: Language;
  onOpenQuoteModal: () => void;
}

export const ProcessAndGuaranteeSection: React.FC<ProcessAndGuaranteeSectionProps> = ({
  language,
  onOpenQuoteModal,
}) => {
  return (
    <section id="proceso" className="py-20 relative bg-[#090c1f] border-t border-[#161d40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121838] border border-[#232c5e] text-xs font-mono text-[#4BE0E8] mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>METODOLOGÍA DE INGENIERÍA 24H</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            ¿Cómo Logramos Entregar tu Web en Solo 24 Horas?
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Eliminamos la burocracia y las semanas perdidas de las agencias tradicionales. Nuestro sistema de desarrollo modular y diseño personalizado garantiza velocidad sin sacrificar calidad ni estética.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            {
              step: '01',
              title: 'Cotización & Reserva',
              time: 'Minuto 0',
              desc: 'Eliges el paquete ideal, seleccionas los módulos adicionales y agendas tu videollamada de arranque en nuestro cotizador interactivo.',
              color: 'text-[#4BE0E8]'
            },
            {
              step: '02',
              title: 'Kick-off de 15 Minutos',
              time: 'Hora 1',
              desc: 'Revisamos tu identidad de marca, logotipo, catálogo y objetivos comerciales para alinear la estructura gráfica perfecta.',
              color: 'text-[#8B7FF5]'
            },
            {
              step: '03',
              title: 'Desarrollo & Maquetación',
              time: 'Horas 2 a 18',
              desc: 'Nuestros desarrolladores senior programan el frontend responsive, configuran WhatsApp, pasarelas de pago y optimizan el SEO.',
              color: 'text-[#4BE0E8]'
            },
            {
              step: '04',
              title: 'Lanzamiento en Vivo',
              time: 'Hora 24',
              desc: 'Tu dominio .com y certificado SSL quedan configurados en la nube con velocidad 100/100, listos para recibir clientes y vender.',
              color: 'text-emerald-400'
            },
          ].map(item => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-[#0c1026] border border-[#1d2754] relative group hover:border-[#4BE0E8]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-3xl font-black font-mono ${item.color}`}>
                  {item.step}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#141b3b] text-slate-400 border border-[#232f64]">
                  {item.time}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison: Traditional Agency vs FORJA WEBS */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0b0e24] border border-[#232f64] p-6 sm:p-10 shadow-2xl mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#8B7FF5] uppercase tracking-wider">
              Comparativa de Eficiencia
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Agencia Tradicional vs FORJA WEBS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="p-5 rounded-2xl bg-[#080b1a] border border-red-500/20 space-y-3 text-xs">
              <span className="text-red-400 font-bold uppercase font-mono block">Agencias Tradicionales:</span>
              <div className="space-y-2 text-slate-400">
                <p>❌ Tiempos de entrega de 4 a 8 semanas</p>
                <p>❌ Reuniones interminables sin avances visibles</p>
                <p>❌ Presupuestos inflados con costos ocultos</p>
                <p>❌ Webs pesadas hechas con plantillas lentas</p>
                <p>❌ Sin garantía de puntualidad</p>
              </div>
            </div>

            {/* FORJA WEBS */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121838] to-[#0c112b] border border-[#4BE0E8]/40 shadow-[0_0_20px_rgba(75,224,232,0.15)] space-y-3 text-xs">
              <span className="text-[#4BE0E8] font-bold uppercase font-mono block">FORJA WEBS (Modelo 2026):</span>
              <div className="space-y-2 text-slate-200">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4BE0E8]" />
                  <span>Entrega completa y en vivo en 24 horas</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4BE0E8]" />
                  <span>Kick-off ágil de 15 min y desarrollo inmediato</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4BE0E8]" />
                  <span>Precios transparentes y sin sorpresas</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4BE0E8]" />
                  <span>Velocidad de carga superior a 95+ en Google</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4BE0E8]" />
                  <span>Garantía escrita 24h: o recibes 50% de crédito</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Banner (ID #garantia-24h for smooth scroll) */}
        <div id="garantia-24h" className="rounded-3xl bg-gradient-to-r from-[#172046] via-[#101736] to-[#0b0e24] border border-[#4BE0E8]/40 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-[0_0_40px_rgba(75,224,232,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Flame className="w-48 h-48 text-[#4BE0E8]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>GARANTÍA DE CUMPLIMIENTO SLA 24H</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              Tu Página Web Lista en 24 Horas o te Bonificamos el 50%
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Confiamos tanto en nuestra metodología de ingeniería de software que si no te entregamos tu sitio web funcional y adaptado a tu negocio dentro del plazo de 24 horas acordado, te devolvemos el 50% de tu pago y terminamos la web gratis.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-3.5 rounded-xl font-extrabold text-[#070814] gradient-forja-btn shadow-[0_0_25px_rgba(75,224,232,0.4)] hover:shadow-[0_0_40px_rgba(75,224,232,0.6)] text-sm tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                HAZ REALIDAD TU IDEA · COTIZAR EN 24H
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
