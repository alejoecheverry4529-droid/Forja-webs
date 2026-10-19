/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookingRequest, 
  BookingStatus, 
  PaymentStatus, 
  ClientProfile, 
  TeamMember, 
  UserRole, 
  DailySalesStat, 
  PushNotification, 
  Language, 
  Currency,
  ServiceProduct 
} from './types';
import { 
  INITIAL_SERVICES, 
  INITIAL_BOOKINGS, 
  INITIAL_CLIENTS, 
  INITIAL_TEAM, 
  INITIAL_DAILY_STATS, 
  INITIAL_NOTIFICATIONS 
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProcessAndGuaranteeSection } from './components/ProcessAndGuaranteeSection';
import { SecurityAndE2EESection } from './components/SecurityAndE2EESection';
import { Footer } from './components/Footer';
import { BookingAndQuoteModal } from './components/BookingAndQuoteModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CryptoInspectionModal } from './components/CryptoInspectionModal';
import { notificationService } from './services/notifications';
import { generateSha256Hash } from './services/encryption';

export default function App() {
  // Navigation & Localization State
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Core Data State (with localStorage persistence)
  const [services, setServices] = useState<ServiceProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_services_v2');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_SERVICES;
  });

  const handleUpdateServices = (updated: ServiceProduct[]) => {
    setServices(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forja_services_v2', JSON.stringify(updated));
    }
  };
  
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_bookings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [clients, setClients] = useState<ClientProfile[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_clients');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_CLIENTS;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_team');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_TEAM;
  });

  const [activeMember, setActiveMember] = useState<TeamMember>(() => {
    return teamMembers[0] || INITIAL_TEAM[0];
  });

  const [dailyStats, setDailyStats] = useState<DailySalesStat[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_daily_stats');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_DAILY_STATS;
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forja_notifications');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceProduct | null>(null);
  const [cryptoInspectionBooking, setCryptoInspectionBooking] = useState<BookingRequest | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('forja_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('forja_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('forja_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('forja_daily_stats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  useEffect(() => {
    localStorage.setItem('forja_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handle new booking submission
  const handleBookingCreated = (newBooking: BookingRequest) => {
    setBookings(prev => [newBooking, ...prev]);

    // Update or add client
    setClients(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === newBooking.clientEmail.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          totalSpentUSD: c.totalSpentUSD + newBooking.estimatedTotalUSD,
          bookingsCount: c.bookingsCount + 1,
          lastActiveDate: new Date().toISOString().slice(0, 10),
          associatedBookingIds: [newBooking.id, ...c.associatedBookingIds]
        } : c);
      } else {
        const newClient: ClientProfile = {
          id: `cli-${Date.now()}`,
          name: newBooking.clientName,
          email: newBooking.clientEmail,
          phone: newBooking.clientPhone,
          company: newBooking.companyName,
          country: 'Colombia / LATAM',
          avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 500)}?w=150&auto=format&fit=crop&q=80`,
          totalSpentUSD: newBooking.estimatedTotalUSD,
          bookingsCount: 1,
          firstContactDate: new Date().toISOString().slice(0, 10),
          lastActiveDate: new Date().toISOString().slice(0, 10),
          status: 'active',
          tags: ['Nuevo Cliente', newBooking.deliverySpeed === '24h' ? 'Rush 24h' : 'Estándar'],
          internalNotes: [
            {
              id: `note-${Date.now()}`,
              date: new Date().toLocaleString(),
              author: activeMember.name,
              text: `Cotización inicial registrada para "${newBooking.serviceName}".`
            }
          ],
          associatedBookingIds: [newBooking.id]
        };
        return [newClient, ...prev];
      }
    });

    // Update today's statistics
    setDailyStats(prev => {
      const lastIndex = prev.length - 1;
      const today = prev[lastIndex];
      const updatedToday = {
        ...today,
        revenueUSD: today.revenueUSD + newBooking.estimatedTotalUSD,
        bookingsCount: today.bookingsCount + 1
      };
      const copy = [...prev];
      copy[lastIndex] = updatedToday;
      return copy;
    });

    // Add push notification
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `⚡ Nueva Reserva ${newBooking.deliverySpeed === '24h' ? '24H' : ''}: ${newBooking.id}`,
      message: `${newBooking.clientName} solicitó ${newBooking.serviceName} ($${newBooking.estimatedTotalUSD} USD).`,
      timestamp: 'Ahora mismo',
      type: 'booking',
      read: false,
      bookingId: newBooking.id
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Simulate an incoming booking in real time
  const handleSimulateBooking = async () => {
    const randomNames = [
      { name: 'Andrés Felipe Morales', company: 'Inmobiliaria Horizonte', email: 'andres@inmhorizonte.com', phone: '+57 315 782 9940' },
      { name: 'Camila Robledo', company: 'Studio Botánico', email: 'hola@botanicostudio.co', phone: '+57 302 449 8122' },
      { name: 'David Quintana', company: 'Finanzas Quantum', email: 'david@quantumfin.com', phone: '+1 305 892 4410' },
      { name: 'Dra. Paola Restrepo', company: 'Clínica Láser & Piel', email: 'contacto@laserpiel.com', phone: '+57 310 992 1100' },
    ];
    const picked = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    const bookingId = `FW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const hashPayload = JSON.stringify({
      id: bookingId,
      client: picked.name,
      service: randomService.title,
      price: randomService.priceUSD,
      timestamp: Date.now()
    });
    const hash = await generateSha256Hash(hashPayload);

    const simulatedBooking: BookingRequest = {
      id: bookingId,
      clientName: picked.name,
      clientEmail: picked.email,
      clientPhone: picked.phone,
      companyName: picked.company,
      serviceId: randomService.id,
      serviceName: randomService.title,
      deliverySpeed: '24h',
      targetDate: new Date().toISOString().slice(0, 10),
      targetTime: '02:00 PM',
      selectedAddons: ['Botón WhatsApp Directo', 'Optimización Google PageSpeed 95+'],
      estimatedTotalUSD: randomService.priceUSD,
      currency: 'USD',
      status: 'pending',
      paymentStatus: 'deposit_paid',
      paymentGateway: 'stripe',
      assignedStaffId: 'dev-1',
      projectNotes: 'Solicitud entrante de alta prioridad para lanzamiento comercial en 24 horas.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      encryptedDataHash: hash,
      encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
      isEncrypted: true,
      meetingLink: `https://meet.google.com/fw-${bookingId.toLowerCase()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    notificationService.playBookingChime();
    notificationService.sendBrowserNotification(
      `⚡ Nueva Solicitud en Vivo: ${simulatedBooking.id}`,
      `${simulatedBooking.clientName} ha solicitado ${simulatedBooking.serviceName} ($${simulatedBooking.estimatedTotalUSD} USD).`
    );

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    handleBookingCreated(simulatedBooking);
  };

  // Status and Staff Updates
  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b));
  };

  const handleUpdatePaymentStatus = (bookingId: string, paymentStatus: PaymentStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus, updatedAt: new Date().toISOString() } : b));
  };

  const handleAssignStaff = (bookingId: string, staffId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, assignedStaffId: staffId } : b));
  };

  const handleAddClientNote = (clientId: string, noteText: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          internalNotes: [
            ...c.internalNotes,
            {
              id: `note-${Date.now()}`,
              date: new Date().toLocaleString(),
              author: activeMember.name,
              text: noteText
            }
          ]
        };
      }
      return c;
    }));
  };

  const handleUpdateMemberRole = (memberId: string, role: UserRole) => {
    setTeamMembers(prev => prev.map(m => m.id === memberId ? { ...m, role } : m));
    if (activeMember.id === memberId) {
      setActiveMember(prev => ({ ...prev, role }));
    }
  };

  const handleTogglePermission = (memberId: string, permissionKey: keyof TeamMember['permissions']) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          permissions: {
            ...m.permissions,
            [permissionKey]: !m.permissions[permissionKey]
          }
        };
      }
      return m;
    }));
  };

  const handleAddTeamMember = (newMember: Omit<TeamMember, 'id'>) => {
    const member: TeamMember = {
      ...newMember,
      id: `team-${Date.now()}`
    };
    setTeamMembers(prev => [...prev, member]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070814] text-slate-100 flex flex-col selection:bg-[#4BE0E8]/30 selection:text-[#4BE0E8]">
      
      {/* Global Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        markAllNotificationsAsRead={markAllNotificationsAsRead}
        onOpenQuoteModal={() => {
          setPreselectedService(null);
          setIsQuoteModalOpen(true);
        }}
        activeMember={activeMember}
        teamMembers={teamMembers}
        onSelectTeamMember={setActiveMember}
      />

      {/* Main Body View */}
      {currentView === 'public' ? (
        <main className="flex-1">
          {/* Hero Section matching the user's uploaded flyer */}
          <HeroSection
            language={language}
            currency={currency}
            onOpenQuoteModal={() => {
              setPreselectedService(null);
              setIsQuoteModalOpen(true);
            }}
            onScrollToServices={scrollToServices}
          />

          {/* Product Catalog with full specs */}
          <ProductCatalog
            services={services}
            language={language}
            currency={currency}
            onSelectServiceForQuote={(service) => {
              setPreselectedService(service);
              setIsQuoteModalOpen(true);
            }}
          />

          {/* Methodology & 24h Guarantee */}
          <ProcessAndGuaranteeSection
            language={language}
            onOpenQuoteModal={() => {
              setPreselectedService(null);
              setIsQuoteModalOpen(true);
            }}
          />

          {/* End-to-End Cryptography Section */}
          <SecurityAndE2EESection
            language={language}
          />
        </main>
      ) : (
        /* Real-Time Administrative Panel */
        <main className="flex-1">
          <AdminDashboard
            bookings={bookings}
            clients={clients}
            teamMembers={teamMembers}
            activeMember={activeMember}
            dailyStats={dailyStats}
            services={services}
            language={language}
            currency={currency}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onAssignStaff={handleAssignStaff}
            onAddClientNote={handleAddClientNote}
            onUpdateMemberRole={handleUpdateMemberRole}
            onTogglePermission={handleTogglePermission}
            onAddTeamMember={handleAddTeamMember}
            onUpdateServices={handleUpdateServices}
            onSimulateBooking={handleSimulateBooking}
            onBackToClientView={() => setCurrentView('public')}
            onInspectCrypto={(booking) => setCryptoInspectionBooking(booking)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        language={language}
        currency={currency}
        onOpenQuoteModal={() => {
          setPreselectedService(null);
          setIsQuoteModalOpen(true);
        }}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Multi-step Interactive Quote & Booking Engine Modal */}
      <BookingAndQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        services={services}
        preselectedService={preselectedService}
        language={language}
        currency={currency}
        onBookingCreated={handleBookingCreated}
      />

      {/* E2EE Cryptographic Hash Inspection Dialog */}
      <CryptoInspectionModal
        booking={cryptoInspectionBooking}
        onClose={() => setCryptoInspectionBooking(null)}
      />

    </div>
  );
}
