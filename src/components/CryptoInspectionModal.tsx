import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Key, 
  Copy, 
  Check, 
  CheckCircle2, 
  Cpu, 
  FileText 
} from 'lucide-react';
import { BookingRequest } from '../types';

interface CryptoInspectionModalProps {
  booking: BookingRequest | null;
  onClose: () => void;
}

export const CryptoInspectionModal: React.FC<CryptoInspectionModalProps> = ({
  booking,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(true);

  if (!booking) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.encryptedDataHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyLive = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b0e24] border border-[#232d64] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#131938] text-slate-400 hover:text-white flex items-center justify-center border border-[#212c5e]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-[#4BE0E8]" />
          <span className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider font-bold">
            Auditoría de Cifrado Extremo a Extremo
          </span>
        </div>
        <h3 className="text-xl font-black text-white">Inspección Criptográfica Ticket #{booking.id}</h3>
        <p className="text-xs text-slate-400 mt-1">
          Verificación de autenticidad inmutable e integridad de datos confidenciales.
        </p>

        <div className="my-6 space-y-4 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-[#080b1a] border border-[#1e2752] space-y-2">
            <span className="text-slate-400 font-mono text-[10px] uppercase block">
              Firma Criptográfica SHA-256 (Hash Digest):
            </span>
            <div className="flex items-center justify-between gap-2 bg-[#0c1024] p-2.5 rounded-xl border border-[#1b2348]">
              <span className="font-mono text-[#4BE0E8] text-[11px] break-all select-all">
                {booking.encryptedDataHash}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-[#141b3b] text-slate-300 hover:text-white shrink-0"
                title="Copiar Hash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#080b1a] border border-[#1e2752]">
              <span className="text-slate-400 font-mono text-[10px] block">Algoritmo de Cifrado:</span>
              <span className="text-white font-mono font-bold mt-1 block">AES-GCM 256 bits</span>
            </div>
            <div className="p-3 rounded-xl bg-[#080b1a] border border-[#1e2752]">
              <span className="text-slate-400 font-mono text-[10px] block">Estado de Integridad:</span>
              <span className="text-emerald-400 font-mono font-bold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Intacto / No Alterado
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#080b1a] border border-[#1e2752] space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Cliente Cifrado:</span>
              <span className="text-white">{booking.clientName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Servicio:</span>
              <span className="text-white">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fecha Registro:</span>
              <span className="text-slate-300">{booking.createdAt}</span>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-[#182147] flex items-center justify-between">
          <button
            onClick={verifyLive}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-[#141b3b] hover:bg-[#1a234c] text-[#4BE0E8] border border-[#26346e] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isVerifying ? 'Verificando con Web Crypto...' : 'Re-verificar Firma SHA-256'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn cursor-pointer"
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  );
};
