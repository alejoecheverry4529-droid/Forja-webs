import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Database, 
  CheckCircle2, 
  Cpu, 
  FileCheck 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../services/i18n';

interface SecurityAndE2EESectionProps {
  language: Language;
}

export const SecurityAndE2EESection: React.FC<SecurityAndE2EESectionProps> = ({ language }) => {
  const t = translations[language].security;

  return (
    <section id="seguridad-e2ee" className="py-20 relative bg-[#070814] border-t border-[#161d40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121838] border border-[#232c5e] text-xs font-mono text-[#8B7FF5] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#4BE0E8]" />
            <span>ESTÁNDARES DE SEGURIDAD DIGITAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Cifrado de Extremo a Extremo & Privacidad Blindada
          </h2>
          <p className="mt-4 text-base text-slate-300">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AES-GCM 256-bit */}
          <div className="p-6 rounded-3xl bg-[#0c1026] border border-[#1e2754] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#141b3d] border border-[#27356e] flex items-center justify-center text-[#4BE0E8] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cifrado AES-GCM 256 bits</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tus cotizaciones, presupuestos y números de teléfono son convertidos en texto cifrado antes de enviarse a nuestros servidores. Solo tú y el personal autorizado con llave criptográfica pueden descifrarlo.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#4BE0E8]">
              ✓ Autenticación de mensaje GCM integrada
            </div>
          </div>

          {/* Card 2: SHA-256 Cryptographic Hash */}
          <div className="p-6 rounded-3xl bg-[#0c1026] border border-[#1e2754] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#141b3d] border border-[#27356e] flex items-center justify-center text-[#8B7FF5] mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Firma SHA-256 Anti-Alteración</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cada reserva genera un hash criptográfico único. Si alguien intenta alterar los términos de tu orden, el hash deja de coincidir y se genera una alerta inmediata de seguridad.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#8B7FF5]">
              ✓ Integridad inmutable garantizada
            </div>
          </div>

          {/* Card 3: Secure Payments */}
          <div className="p-6 rounded-3xl bg-[#0c1026] border border-[#1e2754] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#141b3d] border border-[#27356e] flex items-center justify-center text-emerald-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cumplimiento PCI-DSS & SSL</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No almacenamos números de tarjeta de crédito. Todas las transacciones se realizan a través de conexiones SSL de 256 bits con pasarelas certificadas a nivel bancario internacional.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400">
              ✓ Nivel de seguridad bancaria
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
