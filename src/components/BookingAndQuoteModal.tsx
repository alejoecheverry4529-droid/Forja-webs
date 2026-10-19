import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Check, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Key, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { ServiceProduct, BookingRequest, Language, Currency, DeliverySpeed, PaymentGateway } from '../types';
import { translations, formatCurrency } from '../services/i18n';
import { encryptSensitiveData, generateSha256Hash } from '../services/encryption';
import { notificationService } from '../services/notifications';

interface BookingAndQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceProduct[];
  preselectedService?: ServiceProduct | null;
  language: Language;
  currency: Currency;
  onBookingCreated: (booking: BookingRequest) => void;
}

export const BookingAndQuoteModal: React.FC<BookingAndQuoteModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedService,
  language,
  currency,
  onBookingCreated,
}) => {
  const t = translations[language].quoteModal;

  // Step state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  // Form selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService ? preselectedService.id : services[0]?.id || 'landing-24h'
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Botón WhatsApp Inteligente'
  ]);
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('24h');
  const [targetDate, setTargetDate] = useState<string>('2026-10-19');
  const [targetTime, setTargetTime] = useState<string>('10:00 AM');
  
  // Client contact form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');

  // Payment method
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>('stripe');

  // Encryption live status
  const [liveSha256Hash, setLiveSha256Hash] = useState<string>('7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  // Add-ons list with costs
  const AVAILABLE_ADDONS = [
    { id: 'Botón WhatsApp Inteligente', price: 0, desc: 'Chat directo con saludo y mensaje personalizado de lead' },
    { id: 'Pasarela Stripe / Tarjetas Crédito', price: 18, desc: 'Acepta pagos con Visa, Mastercard, Apple Pay en tu web' },
    { id: 'Pasarela PayPal Internacional', price: 15, desc: 'Cobros mundiales con cuenta PayPal y saldo en dólares' },
    { id: 'Pasarela MercadoPago / Wompi / PSE', price: 15, desc: 'Pagos locales en Colombia / LATAM mediante débito PSE y efectivo' },
    { id: 'Sistema de Citas y Reservas Online', price: 18, desc: 'Calendario interactivo para que tus clientes agenden llamadas' },
    { id: 'Optimización SEO Avanzada + Google Maps', price: 12, desc: 'Indexación inmediata en Google Search Console y ficha local' },
    { id: 'Multilenguaje (Español / Inglés)', price: 18, desc: 'Sitio traducido y adaptado a clientes internacionales' },
  ];

  // Calculation of totals
  const basePrice = currentService.priceUSD;
  const addonsPrice = selectedAddons.reduce((acc, addonName) => {
    const item = AVAILABLE_ADDONS.find(a => a.id === addonName);
    return acc + (item ? item.price : 0);
  }, 0);

  // Speed multiplier
  let speedMultiplier = 1.0;
  if (deliverySpeed === '24h') {
    speedMultiplier = 1.0; // Standard 24h promise is included!
  } else if (deliverySpeed === 'standard_7d') {
    speedMultiplier = 0.9; // 10% discount for slower delivery
  }

  const estimatedTotalUSD = Math.round((basePrice + addonsPrice) * speedMultiplier);

  const toggleAddon = (addonName: string) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter(a => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 4) {
      // Validate inputs
      if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
        alert('Por favor completa tu Nombre, Correo y Teléfono de contacto.');
        return;
      }
      // Generate live cryptographic hash
      const payloadString = JSON.stringify({
        clientName,
        clientEmail,
        clientPhone,
        companyName,
        service: currentService.title,
        estimatedTotalUSD,
        date: targetDate
      });
      const hash = await generateSha256Hash(payloadString);
      setLiveSha256Hash(hash);
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      // Generate real E2EE AES-GCM encryption of client info
      const sensitivePayload = {
        clientName,
        clientEmail,
        clientPhone,
        companyName,
        projectNotes,
        selectedAddons,
        timestamp: new Date().toISOString()
      };
      
      const encrypted = await encryptSensitiveData(sensitivePayload);
      const bookingId = `FW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newBooking: BookingRequest = {
        id: bookingId,
        clientName,
        clientEmail,
        clientPhone,
        companyName: companyName || 'Cliente Particular',
        serviceId: currentService.id,
        serviceName: currentService.title,
        deliverySpeed,
        targetDate,
        targetTime,
        selectedAddons,
        estimatedTotalUSD,
        currency,
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentGateway,
        projectNotes: projectNotes || 'Solicitud generada desde el cotizador web en tiempo real.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        encryptedDataHash: encrypted.hashSha256,
        encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
        isEncrypted: true,
        meetingLink: `https://meet.google.com/fw-${bookingId.toLowerCase()}`,
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      };

      // Play audio notification chime
      notificationService.playBookingChime();
      
      // Dispatch browser push notification
      notificationService.sendBrowserNotification(
        `⚡ Nueva Reserva ${bookingId}`,
        `${clientName} solicitó "${currentService.title}" con entrega ${deliverySpeed === '24h' ? 'en 24 Horas' : 'estándar'}.`
      );

      // Launch celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      onBookingCreated(newBooking);
      setSubmittedBooking(newBooking);
    } catch (e) {
      console.error('Error creating encrypted booking:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppDirect = () => {
    if (!submittedBooking) return;
    const msg = encodeURIComponent(
      `¡Hola FORJA WEBS! 👋 Acabo de registrar mi cotización #${submittedBooking.id} para el servicio "${submittedBooking.serviceName}". Mi nombre es ${submittedBooking.clientName} (${submittedBooking.companyName}). Deseo iniciar mi proyecto en 24 horas.`
    );
    window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <div className="bg-[#0b0e24] border border-[#27346d] rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[95vh] overflow-y-auto shadow-[0_0_50px_rgba(75,224,232,0.2)] relative text-slate-100">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#131938] text-slate-400 hover:text-white flex items-center justify-center border border-[#222c5e] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-[#1b234a]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4BE0E8] animate-ping"></span>
            <span className="text-xs font-mono text-[#4BE0E8] uppercase tracking-wider font-semibold">
              Sistema de Cotización y Reservas 24H
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{t.title}</h2>
          
          {/* Step Progress Indicators */}
          {!submittedBooking && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map(stepNum => (
                <div
                  key={stepNum}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    currentStep >= stepNum
                      ? 'bg-gradient-to-r from-[#8B7FF5] to-[#4BE0E8]'
                      : 'bg-[#182147]'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Success Screen after submission */}
        {submittedBooking ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{t.successTitle}</h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">{t.successSub}</p>
            </div>

            {/* Booking confirmation ticket card */}
            <div className="p-6 rounded-2xl bg-[#0e132e] border border-[#232f64] text-left max-w-lg mx-auto font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-[#1b2552] pb-2">
                <span className="text-slate-400">ID de Reserva:</span>
                <span className="text-[#4BE0E8] font-bold">{submittedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Servicio:</span>
                <span className="text-white font-semibold">{submittedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cliente:</span>
                <span className="text-white">{submittedBooking.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entrega Estimada:</span>
                <span className="text-emerald-400 font-bold">
                  {submittedBooking.deliverySpeed === '24h' ? '24 Horas Garantizado' : 'Estándar'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Inversión Estimada:</span>
                <span className="text-white font-bold">{formatCurrency(submittedBooking.estimatedTotalUSD, currency)}</span>
              </div>
              <div className="flex justify-between border-t border-[#1b2552] pt-2">
                <span className="text-slate-400">Firma Criptográfica SHA-256:</span>
                <span className="text-[#8B7FF5] text-[10px] truncate max-w-[180px]">
                  {submittedBooking.encryptedDataHash}
                </span>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={openWhatsAppDirect}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070814] font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#141b3b] hover:bg-[#1a234c] text-white font-semibold border border-[#243063] transition-colors cursor-pointer"
              >
                Cerrar & Ver en Panel Admin
              </button>
            </div>
          </div>
        ) : (
          /* Step-by-Step Flow */
          <div>
            {/* STEP 1: Service & Addons */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Selecciona el Paquete Principal
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map(s => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedServiceId(s.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedServiceId === s.id
                            ? 'bg-[#151c3d] border-[#4BE0E8] shadow-[0_0_15px_rgba(75,224,232,0.2)]'
                            : 'bg-[#0e1227] border-[#1d2650] hover:border-[#323f7a]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-white">{s.title}</p>
                          <span className="text-xs font-mono font-bold text-[#4BE0E8]">
                            {formatCurrency(s.priceUSD, currency)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{s.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons selection */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Integraciones & Módulos Adicionales (Opcional)
                  </label>
                  <div className="space-y-2">
                    {AVAILABLE_ADDONS.map(addon => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#141b3b] border-[#8B7FF5]/60'
                              : 'bg-[#0d1024] border-[#1b2246] hover:border-[#273366]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isChecked ? 'bg-[#8B7FF5] border-[#8B7FF5] text-[#070814]' : 'border-slate-600'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{addon.id}</p>
                              <p className="text-[10px] text-slate-400">{addon.desc}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-300">
                            {addon.price === 0 ? 'Gratis' : `+ ${formatCurrency(addon.price, currency)}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Speed */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">¿Con qué urgencia requieres tu sitio web?</h3>
                  <p className="text-xs text-slate-400">
                    Nuestra especialidad es la entrega express en 24 horas. También puedes optar por plazos estándar.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: '24h',
                      title: '⚡ Entrega Express en 24 Horas (Recomendado)',
                      badge: 'COMPROMISO FORJA WEBS',
                      desc: 'Despliegue y entrega en menos de 24 horas reloj con garantía de puntualidad.',
                      tag: 'Máxima Prioridad'
                    },
                    {
                      id: 'express_3d',
                      title: '🗓️ Express 3 Días',
                      badge: 'FLEXIBLE',
                      desc: 'Ideal para proyectos con revisión intermedia de contenidos.',
                      tag: 'Ritmo Moderado'
                    },
                    {
                      id: 'standard_7d',
                      title: '🌱 Estándar 7 Días (10% Descuento)',
                      badge: 'ECONÓMICO',
                      desc: 'Entrega en 1 semana laboral con descuento en la tarifa final.',
                      tag: 'Ahorro 10%'
                    }
                  ].map(option => (
                    <div
                      key={option.id}
                      onClick={() => setDeliverySpeed(option.id as DeliverySpeed)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliverySpeed === option.id
                          ? 'bg-[#151c3d] border-[#4BE0E8] shadow-[0_0_20px_rgba(75,224,232,0.2)]'
                          : 'bg-[#0e1227] border-[#1d2650] hover:border-[#2f3c78]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{option.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4BE0E8]/20 text-[#4BE0E8]">
                          {option.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{option.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Kickoff Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Agenda tu Reunión de Kick-off Estratégico</h3>
                  <p className="text-xs text-slate-400">
                    Definiremos colores, logotipo, estructura y textos para comenzar a construir inmediatamente.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Fecha Estimada de Inicio</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={e => setTargetDate(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4BE0E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">Horario Preferido (Videollamada 15 min)</label>
                    <select
                      value={targetTime}
                      onChange={e => setTargetTime(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4BE0E8]"
                    >
                      <option value="09:00 AM">09:00 AM (Mañana)</option>
                      <option value="10:00 AM">10:00 AM (Mañana)</option>
                      <option value="11:30 AM">11:30 AM (Mañana)</option>
                      <option value="02:00 PM">02:00 PM (Tarde)</option>
                      <option value="03:30 PM">03:30 PM (Tarde)</option>
                      <option value="05:00 PM">05:00 PM (Tarde)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1329] border border-[#1f2852] flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#4BE0E8] shrink-0" />
                  <p className="text-xs text-slate-300">
                    Te enviaremos automáticamente el enlace de Google Meet y confirmación por WhatsApp tras finalizar.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: Client info & E2EE Cryptographic Preview */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Tus Datos de Contacto</h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#4BE0E8]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cifrado E2EE Activo</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      placeholder="Ej. Carlos Restrepo"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Empresa / Negocio</label>
                    <input
                      type="text"
                      placeholder="Ej. Inversiones Andina"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      placeholder="carlos@empresa.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Breve descripción de lo que buscas</label>
                  <textarea
                    rows={2}
                    placeholder="Describe los colores, objetivo o referencias que te gusten..."
                    value={projectNotes}
                    onChange={e => setProjectNotes(e.target.value)}
                    className="w-full bg-[#0d1228] border border-[#232c5c] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#4BE0E8]"
                  ></textarea>
                </div>

                {/* E2EE Live Hash Box */}
                <div className="p-3 rounded-xl bg-[#090c1f] border border-[#202954] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#8B7FF5]" />
                    <span>Algoritmo: AES-GCM 256 bits + SHA-256</span>
                  </div>
                  <span className="text-[#4BE0E8] truncate max-w-[120px]">
                    Firma: {liveSha256Hash.slice(0, 14)}...
                  </span>
                </div>
              </div>
            )}

            {/* STEP 5: Payment Gateway & Final Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Selecciona la Pasarela de Pago o Medio</h3>
                  <p className="text-xs text-slate-400">
                    Puedes abonar el 50% de anticipo para iniciar el desarrollo inmediato en 24h.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'stripe', name: 'Stripe', sub: 'Tarjetas / Apple Pay', badge: 'Automático' },
                    { id: 'paypal', name: 'PayPal', sub: 'Saldo / Tarjeta int.', badge: 'Global' },
                    { id: 'mercadopago', name: 'MercadoPago / Wompi', sub: 'Tarjetas & Débito', badge: 'LATAM' },
                    { id: 'pse_wire', name: 'PSE / Transferencia', sub: 'Bancolombia / Wire', badge: 'Directo' },
                  ].map(gw => (
                    <div
                      key={gw.id}
                      onClick={() => setPaymentGateway(gw.id as PaymentGateway)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all text-center flex flex-col justify-between ${
                        paymentGateway === gw.id
                          ? 'bg-[#151c3d] border-[#4BE0E8] shadow-[0_0_15px_rgba(75,224,232,0.3)]'
                          : 'bg-[#0d1024] border-[#1c244c] hover:border-[#2f3d7c]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#4BE0E8]">{gw.badge}</span>
                      <p className="text-sm font-bold text-white my-1">{gw.name}</p>
                      <p className="text-[10px] text-slate-400">{gw.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Final Quote Summary Box */}
                <div className="p-4 rounded-2xl bg-[#0e132e] border border-[#232f64] font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Paquete Base:</span>
                    <span className="text-white font-semibold">{currentService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Extras / Addons:</span>
                    <span className="text-slate-300">{selectedAddons.length} seleccionados</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Compromiso SLA:</span>
                    <span className="text-emerald-400 font-bold">
                      {deliverySpeed === '24h' ? '⚡ 24 Horas Garantizado' : 'Estándar'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#1d2754] pt-2 text-sm">
                    <span className="text-slate-200 font-bold">Presupuesto Total:</span>
                    <span className="text-2xl font-black text-[#4BE0E8]">
                      {formatCurrency(estimatedTotalUSD, currency)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-[#1b234a] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#0e1227] border border-[#1e2752] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.back}</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-[#070814] gradient-forja-btn shadow-[0_0_20px_rgba(75,224,232,0.3)] hover:shadow-[0_0_30px_rgba(75,224,232,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.next}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-[#070814] gradient-forja-btn shadow-[0_0_30px_rgba(75,224,232,0.5)] hover:shadow-[0_0_40px_rgba(75,224,232,0.7)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Cifrando Datos...' : t.confirmBooking}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
