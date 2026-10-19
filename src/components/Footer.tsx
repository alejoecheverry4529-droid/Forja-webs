import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Lock, 
  ArrowUp,
  Heart
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../services/i18n';

interface FooterProps {
  language: Language;
  currency: Currency;
  onOpenQuoteModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  currency,
  onOpenQuoteModal,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsAppGeneral = () => {
    const text = encodeURIComponent('¡Hola FORJA WEBS! 👋 Deseo asesoría para crear mi página web en 24 horas.');
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#050610] border-t border-[#161d40] text-slate-400 text-xs">
      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={openWhatsAppGeneral}
          className="p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#070814] shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
          title="Chatear con un asesor de FORJA WEBS por WhatsApp"
          aria-label="Contactar por WhatsApp"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.5]" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold ml-0 group-hover:ml-2 text-xs">
            WhatsApp 24H
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B7FF5] to-[#4BE0E8] p-[2px]">
                <div className="w-full h-full bg-[#070814] rounded-[6px] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-[3px] border border-[#4BE0E8] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B7FF5]"></div>
                  </div>
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-white">FORJA WEBS</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              Estudio de ingeniería web y aceleración de negocios. Diseñamos, programamos y desplegamos tu presencia digital profesional en 24 horas.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0e1329] border border-[#1e2754] flex items-center justify-center text-slate-300 hover:text-[#4BE0E8] hover:border-[#4BE0E8] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0e1329] border border-[#1e2754] flex items-center justify-center text-slate-300 hover:text-[#4BE0E8] hover:border-[#4BE0E8] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0e1329] border border-[#1e2754] flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-4">Servicios 24H</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">Landing Page Express 24h</a></li>
              <li><a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">E-Commerce & Tienda Online</a></li>
              <li><a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">Sitio Corporativo & Pyme</a></li>
              <li><a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">Web App a Medida / SaaS</a></li>
              <li><a href="#servicios" className="hover:text-[#4BE0E8] transition-colors">Rediseño & Optimización 24h</a></li>
            </ul>
          </div>

          {/* Col 3: Integraciones & Seguridad */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-4">Integraciones & Pagos</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Stripe (Tarjetas & Apple Pay)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>PayPal Commerce Internacional</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>MercadoPago / Wompi / PSE</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4BE0E8]"></span>
                <span>WhatsApp Business Cloud API</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B7FF5]"></span>
                <span>Cifrado E2EE AES-GCM 256 bits</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Acceso Rápido & Admin */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-4">Operaciones</h4>
            <div className="space-y-3">
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn shadow-md cursor-pointer"
              >
                Cotizar Mi Web Ahora
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0e1329] border border-[#1e2752] transition-colors cursor-pointer"
              >
                Abrir Panel Administrativo
              </button>

              <div className="text-[11px] font-mono text-slate-500 pt-2 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#4BE0E8]" />
                <span>Sesión encriptada con SSL 256 bits</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#131938] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} FORJA WEBS. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Términos de Servicio 24H</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Política de Privacidad Cifrada</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-[#0e1329] border border-[#1b234a] text-slate-400 hover:text-white"
              title="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
