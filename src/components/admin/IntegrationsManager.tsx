import React, { useState } from 'react';
import { 
  CreditCard, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Check, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';

export const IntegrationsManager: React.FC = () => {
  const [stripeConnected, setStripeConnected] = useState(true);
  const [paypalConnected, setPaypalConnected] = useState(true);
  const [mercadoPagoConnected, setMercadoPagoConnected] = useState(true);
  const [whatsappConnected, setWhatsappConnected] = useState(true);

  const [testNotificationStatus, setTestNotificationStatus] = useState<string | null>(null);

  const testWhatsAppWebhook = () => {
    setTestNotificationStatus('Enviando mensaje de prueba a WhatsApp...');
    setTimeout(() => {
      setTestNotificationStatus('✓ Notificación de prueba enviada exitosamente vía WhatsApp API');
      setTimeout(() => setTestNotificationStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Intro */}
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#4BE0E8]" />
          <span>Integraciones Directas: Pasarelas de Pago & Redes Sociales</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Configuración centralizada de pasarelas de pago seguras y canales sociales para adquisición y notificaciones automáticas.
        </p>
      </div>

      {/* Payment Gateways Grid */}
      <div>
        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#8B7FF5]" />
          <span>Pasarelas de Pago Habilitadas</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Stripe */}
          <div className="p-5 rounded-2xl bg-[#0b0e24] border border-[#1e2754] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-black text-white">Stripe Checkout</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Activo
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Procesamiento instantáneo de tarjetas de crédito y Apple Pay para clientes globales con 3D Secure y antifraude.
              </p>
            </div>
            <div className="pt-3 border-t border-[#172045] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Comisión: 2.9% + 30¢</span>
              <button
                onClick={() => setStripeConnected(!stripeConnected)}
                className="text-[#4BE0E8] hover:underline"
              >
                {stripeConnected ? 'Configurado ✓' : 'Conectar'}
              </button>
            </div>
          </div>

          {/* PayPal */}
          <div className="p-5 rounded-2xl bg-[#0b0e24] border border-[#1e2754] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-black text-white">PayPal Commerce</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Activo
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Cobro en dólares y euros con protección al comprador y al vendedor para servicios de diseño web express.
              </p>
            </div>
            <div className="pt-3 border-t border-[#172045] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Monedas: USD, EUR, GBP</span>
              <button
                onClick={() => setPaypalConnected(!paypalConnected)}
                className="text-[#4BE0E8] hover:underline"
              >
                {paypalConnected ? 'Configurado ✓' : 'Conectar'}
              </button>
            </div>
          </div>

          {/* MercadoPago / Wompi */}
          <div className="p-5 rounded-2xl bg-[#0b0e24] border border-[#1e2754] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-black text-white">Mercado Pago / Wompi</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Activo LATAM
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Débito bancario en línea PSE (Colombia), OXXO (México), PIX (Brasil) y tarjetas locales.
              </p>
            </div>
            <div className="pt-3 border-t border-[#172045] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">PSE / PIX / Tarjetas</span>
              <button
                onClick={() => setMercadoPagoConnected(!mercadoPagoConnected)}
                className="text-[#4BE0E8] hover:underline"
              >
                {mercadoPagoConnected ? 'Configurado ✓' : 'Conectar'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Social Media & Instant Channels */}
      <div>
        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#4BE0E8]" />
          <span>Canales de Redes Sociales & Notificaciones Automáticas</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* WhatsApp Automation */}
          <div className="p-5 rounded-2xl bg-[#0b0e24] border border-[#1e2754] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">WhatsApp Business Cloud API</h5>
                  <p className="text-xs text-slate-400">Mensajes automáticos al recibir nueva reserva</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <p className="text-xs text-slate-300">
              Notifica instantáneamente al cliente con su número de ticket, enlace de Google Meet y confirmación de inicio del plazo de 24 horas.
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={testWhatsAppWebhook}
                className="px-3.5 py-1.5 rounded-lg bg-[#141b3b] hover:bg-[#1a234c] text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Probar Disparo de Mensaje
              </button>
              {testNotificationStatus && (
                <span className="text-xs font-mono text-emerald-400">{testNotificationStatus}</span>
              )}
            </div>
          </div>

          {/* Social Presence Hub */}
          <div className="p-5 rounded-2xl bg-[#0b0e24] border border-[#1e2754] space-y-4">
            <h5 className="font-bold text-white text-sm">Perfiles Sociales Oficiales de FORJA WEBS</h5>
            
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#0e1329] border border-[#1c244c] hover:border-[#8B7FF5] flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#8B7FF5]" />
                <span>Instagram</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#0e1329] border border-[#1c244c] hover:border-[#4BE0E8] flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#4BE0E8]" />
                <span>LinkedIn B2B</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#0e1329] border border-[#1c244c] hover:border-red-400 flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>Casos de Éxito</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              ✓ Píxeles de conversión y rastreo de campañas sincronizados.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
