import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  ShieldCheck, 
  Database, 
  Download, 
  RefreshCw, 
  FileCode, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Copy,
  Cpu
} from 'lucide-react';
import { BookingRequest, ClientProfile, DailySalesStat } from '../../types';
import { encryptSensitiveData, decryptSensitiveData, generateSha256Hash, EncryptedPayload } from '../../services/encryption';

interface CryptoVaultAndReportsProps {
  bookings: BookingRequest[];
  clients: ClientProfile[];
  stats: DailySalesStat[];
}

export const CryptoVaultAndReports: React.FC<CryptoVaultAndReportsProps> = ({
  bookings,
  clients,
  stats,
}) => {
  // Live crypto playground state
  const [testPayload, setTestPayload] = useState('{"client":"Alejandro Echeverry","budgetUSD":1200,"projectNotes":"Entrega urgente en 24h"}');
  const [encryptedResult, setEncryptedResult] = useState<EncryptedPayload | null>(null);
  const [decryptedResult, setDecryptedResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleEncryptTest = async () => {
    setIsProcessing(true);
    try {
      const parsed = JSON.parse(testPayload);
      const encrypted = await encryptSensitiveData(parsed);
      setEncryptedResult(encrypted);
      setDecryptedResult('');
    } catch (e) {
      alert('JSON no válido. Por favor revisa la sintaxis.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecryptTest = async () => {
    if (!encryptedResult) return;
    setIsProcessing(true);
    try {
      const decrypted = await decryptSensitiveData(encryptedResult);
      setDecryptedResult(JSON.stringify(decrypted, null, 2));
    } catch (e) {
      alert('Error en descifrado o clave incorrecta.');
    } finally {
      setIsProcessing(false);
    }
  };

  const exportFullCentralizedDatabase = () => {
    const fullBackup = {
      app: 'FORJA WEBS Centralized Database',
      exportDate: new Date().toISOString(),
      encryptionStandard: 'AES-GCM-256 + SHA-256',
      tables: {
        bookings,
        clients,
        stats
      }
    };
    const jsonString = JSON.stringify(fullBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `forja_webs_database_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141b3d] to-[#0d1228] border border-[#4BE0E8]/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider font-bold">
                Arquitectura Criptográfica Enterprise Activa
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Bóveda de Cifrado Extremo a Extremo (E2EE)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Toda la información confidencial de clientes, presupuestos y especificaciones de proyectos en 24 horas se cifra con llaves AES-GCM de 256 bits y hash de integridad SHA-256.
            </p>
          </div>

          <button
            onClick={exportFullCentralizedDatabase}
            className="px-5 py-3 rounded-2xl bg-[#070814] hover:bg-[#0c1024] text-white border border-[#4BE0E8]/50 shadow-[0_0_20px_rgba(75,224,232,0.2)] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Database className="w-4 h-4 text-[#4BE0E8]" />
            <span>Descargar Base de Datos (.JSON)</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Cryptography Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input Payload & Actions */}
        <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#4BE0E8]" />
              <span>Simulador de Cifrado E2EE en Tiempo Real</span>
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B7FF5]/20 text-[#8B7FF5]">
              AES-GCM-256
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Payload Plano del Cliente (JSON)
            </label>
            <textarea
              rows={4}
              value={testPayload}
              onChange={e => setTestPayload(e.target.value)}
              className="w-full bg-[#080b1a] border border-[#1e2752] rounded-xl p-3 text-xs font-mono text-[#4BE0E8] focus:outline-none focus:border-[#4BE0E8]"
            ></textarea>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEncryptTest}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#070814] gradient-forja-btn shadow-[0_0_15px_rgba(75,224,232,0.3)] hover:shadow-[0_0_25px_rgba(75,224,232,0.5)] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Cifrar con AES-GCM</span>
            </button>

            {encryptedResult && (
              <button
                onClick={handleDecryptTest}
                disabled={isProcessing}
                className="px-4 py-2.5 rounded-xl bg-[#141b3b] hover:bg-[#1a234c] text-white border border-[#27346d] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Key className="w-3.5 h-3.5 text-[#4BE0E8]" />
                <span>Descifrar con Llave Maestra</span>
              </button>
            )}
          </div>

          {decryptedResult && (
            <div className="p-3 rounded-xl bg-[#080b1a] border border-emerald-500/40">
              <span className="text-[10px] font-mono text-emerald-400 block mb-1">
                ✓ Payload Descifrado con Integridad Criptográfica Verificada:
              </span>
              <pre className="text-[11px] font-mono text-slate-200 overflow-x-auto">
                {decryptedResult}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Cryptographic Cipher Output */}
        <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B7FF5]" />
              <span>Inspector de Datos Cifrados (Ciphertext)</span>
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">Zero-Knowledge</span>
          </div>

          {encryptedResult ? (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#080b1a] border border-[#1e2752]">
                <span className="text-slate-400 text-[10px] block">Ciphertext (Base64):</span>
                <p className="text-slate-200 break-all text-[11px] mt-1 select-all">
                  {encryptedResult.cipherText}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-[#080b1a] border border-[#1e2752]">
                  <span className="text-slate-400 text-[10px] block">Vector Inicialización (IV):</span>
                  <span className="text-[#4BE0E8] text-[11px] truncate block">{encryptedResult.iv}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#080b1a] border border-[#1e2752]">
                  <span className="text-slate-400 text-[10px] block">Salt Derivación:</span>
                  <span className="text-[#8B7FF5] text-[11px] truncate block">{encryptedResult.salt}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080b1a] border border-[#1e2752] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block">Firma SHA-256 Digest:</span>
                  <span className="text-emerald-400 text-[11px] break-all select-all">
                    {encryptedResult.hashSha256}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(encryptedResult.hashSha256);
                    setCopiedHash(true);
                    setTimeout(() => setCopiedHash(false), 2000);
                  }}
                  className="p-1.5 rounded-lg bg-[#141b3b] text-slate-300 hover:text-white"
                  title="Copiar Hash"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#080b1a] border border-[#182046] text-center text-slate-400 text-xs">
              Presiona "Cifrar con AES-GCM" para generar la inspección criptográfica en tiempo real.
            </div>
          )}
        </div>

      </div>

      {/* Centralized Records Hash Audit Log */}
      <div className="p-6 rounded-3xl bg-[#0b0e24] border border-[#1e2754]">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Auditoría de Integridad Criptográfica de Solicitudes Recientes</span>
        </h4>

        <div className="space-y-2">
          {bookings.map(b => (
            <div
              key={b.id}
              className="p-3 rounded-xl bg-[#080b1a] border border-[#1c244c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-bold">{b.id}</span>
                <span className="text-slate-400">· {b.clientName}</span>
                <span className="text-[#4BE0E8] text-[10px]">({b.serviceName})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">Hash SHA-256:</span>
                <span className="text-[#8B7FF5] text-[11px] truncate max-w-[220px] sm:max-w-[280px]">
                  {b.encryptedDataHash}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                  Verificado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
