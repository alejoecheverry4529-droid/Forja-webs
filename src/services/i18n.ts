import { Language, Currency } from '../types';

export const currencyRates: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  USD: { rate: 1, symbol: '$', prefix: 'USD' },
  COP: { rate: 4200, symbol: '$', prefix: 'COP' },
  EUR: { rate: 0.92, symbol: '€', prefix: 'EUR' },
  MXN: { rate: 19.5, symbol: '$', prefix: 'MXN' },
};

export function formatCurrency(amountUSD: number, currency: Currency): string {
  const { rate, symbol } = currencyRates[currency];
  const converted = amountUSD * rate;
  
  if (currency === 'COP') {
    return `${symbol} ${Math.round(converted).toLocaleString('es-CO')} COP`;
  }
  if (currency === 'EUR') {
    return `${symbol}${converted.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} EUR`;
  }
  if (currency === 'MXN') {
    return `${symbol} ${Math.round(converted).toLocaleString('es-MX')} MXN`;
  }
  return `${symbol}${amountUSD.toLocaleString('en-US')} USD`;
}

export const translations = {
  es: {
    nav: {
      services: 'Servicios',
      benefits: 'Beneficios',
      portfolio: 'Portafolio',
      pricing: 'Cotizador',
      admin: 'Panel Admin',
      clientView: 'Vista Pública',
      bookCall: 'Cotizar en 24h',
      notifications: 'Notificaciones',
      security: 'Cifrado E2EE',
      teamRole: 'Rol Activo',
    },
    hero: {
      badge: 'FORJA WEBS · ESTUDIO DE INGENIERÍA DIGITAL',
      question: '¿NECESITAS UNA PÁGINA WEB?',
      headlineStrong: '¡LA CREAMOS EN 24 HORAS!',
      subtitle: 'Diseños modernos, profesionales y adaptados a tu negocio.',
      bullet1: 'Diseño personalizado a la medida de tu marca',
      bullet2: 'Adaptable a celulares, tablets y computadores',
      bullet3: 'Presencia digital optimizada para vender más',
      kicker: 'HAZ REALIDAD TU IDEA',
      ctaPrimary: 'COTIZA TU PÁGINA WEB',
      ctaSecondary: 'Ver Catálogo y Precios',
      deliveryGuarantee: 'Garantía 24H: Tu web en vivo o te bonificamos el 50%',
      metrics: {
        speed: 'Entrega 24 Horas',
        projects: '+380 Webs Entregadas',
        satisfaction: '99.4% Satisfacción',
        conversion: '3.4x Más Conversión',
      }
    },
    services: {
      title: 'Soluciones Web de Alto Rendimiento',
      subtitle: 'Descubre nuestros paquetes diseñados para impulsar tu negocio desde el primer día con arquitectura de nivel enterprise.',
      rush24hTag: 'Entrega en 24 Horas',
      viewDetails: 'Detalles del Paquete',
      bookNow: 'Cotizar y Reservar',
      includedTitle: 'Lo que incluye tu proyecto:',
      techStackTitle: 'Tecnologías y Estándares:',
    },
    quoteModal: {
      title: 'Cotizador & Reserva Inteligente',
      step1: '1. Selecciona Servicio & Extras',
      step2: '2. Plazo de Entrega',
      step3: '3. Fecha de Inicio / Kickoff',
      step4: '4. Datos con Cifrado E2EE',
      step5: '5. Pago Seguro / Confirmación',
      next: 'Siguiente Paso',
      back: 'Atrás',
      confirmBooking: 'Confirmar Reserva & Proteger Datos',
      successTitle: '¡Solicitud Registrada con Éxito!',
      successSub: 'Hemos asignado tu ticket y notificado al equipo en tiempo real.',
    },
    admin: {
      title: 'Panel Administrativo en Tiempo Real',
      subtitle: 'Control total de cotizaciones, reservas, clientes, analíticas y cifrado.',
      tabBookings: 'Solicitudes en Vivo',
      tabAnalytics: 'Estadísticas Diarias',
      tabClients: 'Historial de Clientes',
      tabTeam: 'Roles & Permisos',
      tabSecurity: 'Bóveda Criptográfica E2EE',
      tabIntegrations: 'Pasarelas & Redes',
      simulateNewBooking: '⚡ Simular Nueva Reserva en Vivo',
      filterAll: 'Todas las solicitudes',
      filterPending: 'Pendientes',
      filterInDev: 'En Desarrollo 24H',
      filterCompleted: 'Finalizadas',
      markStatus: 'Cambiar Estado',
      assignStaff: 'Asignar Asesor',
      clientHistory: 'Historial del Cliente',
      totalRevenue: 'Ingresos Totales',
      dailySales: 'Ventas de Hoy',
      conversionRate: 'Tasa de Conversión',
      activeRequests: 'Solicitudes Activas',
    },
    security: {
      badge: 'Cifrado Extremo a Extremo Activo (E2EE)',
      desc: 'Tus datos de contacto y detalles comerciales son procesados bajo algoritmos AES-GCM 256 bits y firmados criptográficamente con SHA-256.',
      verified: 'Integridad Criptográfica Verificada',
    }
  },
  en: {
    nav: {
      services: 'Services',
      benefits: 'Benefits',
      portfolio: 'Portfolio',
      pricing: 'Quote Engine',
      admin: 'Admin Panel',
      clientView: 'Public View',
      bookCall: 'Get Quote in 24h',
      notifications: 'Notifications',
      security: 'E2EE Encryption',
      teamRole: 'Active Role',
    },
    hero: {
      badge: 'FORJA WEBS · DIGITAL ENGINEERING STUDIO',
      question: 'DO YOU NEED A WEBSITE?',
      headlineStrong: 'WE BUILD IT IN 24 HOURS!',
      subtitle: 'Modern, high-converting and bespoke designs tailored to your business.',
      bullet1: 'Tailor-made custom design for your brand identity',
      bullet2: 'Fully responsive across mobile, tablets & desktops',
      bullet3: 'High-converting digital presence optimized for sales',
      kicker: 'BRING YOUR VISION TO LIFE',
      ctaPrimary: 'QUOTE YOUR WEBSITE',
      ctaSecondary: 'Browse Packages & Prices',
      deliveryGuarantee: '24H Guarantee: Live on time or 50% credit applied',
      metrics: {
        speed: '24h Rapid Delivery',
        projects: '+380 Deployed Webs',
        satisfaction: '99.4% Client Rating',
        conversion: '3.4x Higher Conversion',
      }
    },
    services: {
      title: 'High-Performance Web Solutions',
      subtitle: 'Discover our packages designed to accelerate your business from day one with enterprise-grade tech.',
      rush24hTag: '24-Hour Delivery',
      viewDetails: 'Package Details',
      bookNow: 'Quote & Reserve',
      includedTitle: 'Included in your project:',
      techStackTitle: 'Technologies & Standards:',
    },
    quoteModal: {
      title: 'Smart Quoter & Booking Engine',
      step1: '1. Select Service & Add-ons',
      step2: '2. Delivery Speed',
      step3: '3. Kickoff Date & Time',
      step4: '4. E2EE Encrypted Client Info',
      step5: '5. Secure Payment & Confirm',
      next: 'Next Step',
      back: 'Back',
      confirmBooking: 'Confirm Booking & Encrypt Data',
      successTitle: 'Request Successfully Booked!',
      successSub: 'Ticket dispatched and admin alerted in real time.',
    },
    admin: {
      title: 'Real-Time Administrative Dashboard',
      subtitle: 'Complete control of quote requests, reservations, clients, analytics and E2EE security.',
      tabBookings: 'Live Bookings',
      tabAnalytics: 'Daily Sales',
      tabClients: 'Customer History',
      tabTeam: 'Roles & Permissions',
      tabSecurity: 'E2EE Crypto Vault',
      tabIntegrations: 'Gateways & Social',
      simulateNewBooking: '⚡ Simulate New Incoming Booking',
      filterAll: 'All Requests',
      filterPending: 'Pending',
      filterInDev: 'In 24H Development',
      filterCompleted: 'Completed',
      markStatus: 'Change Status',
      assignStaff: 'Assign Staff',
      clientHistory: 'Customer History',
      totalRevenue: 'Total Revenue',
      dailySales: 'Today Sales',
      conversionRate: 'Conversion Rate',
      activeRequests: 'Active Requests',
    },
    security: {
      badge: 'End-to-End Encryption Active (E2EE)',
      desc: 'Your commercial and private contact information is protected via AES-GCM 256-bit keys and cryptographic SHA-256 hashes.',
      verified: 'Cryptographic Integrity Verified',
    }
  },
  pt: {
    nav: {
      services: 'Serviços',
      benefits: 'Benefícios',
      portfolio: 'Portfólio',
      pricing: 'Orçamento',
      admin: 'Painel Admin',
      clientView: 'Visualização Pública',
      bookCall: 'Orçar em 24h',
      notifications: 'Notificações',
      security: 'Criptografia E2EE',
      teamRole: 'Função Ativa',
    },
    hero: {
      badge: 'FORJA WEBS · ESTÚDIO DE ENGENHARIA DIGITAL',
      question: 'PRECISA DE UM SITE PROFISSIONAL?',
      headlineStrong: 'CRIAMOS EM 24 HORAS!',
      subtitle: 'Designs modernos, profissionais e adaptados ao seu negócio.',
      bullet1: 'Design personalizado sob medida para sua marca',
      bullet2: 'Adaptável para celulares, tablets e computadores',
      bullet3: 'Presença digital projetada para vender mais',
      kicker: 'REALIZE A SUA IDEIA',
      ctaPrimary: 'SOLICITAR ORÇAMENTO',
      ctaSecondary: 'Ver Catálogo e Preços',
      deliveryGuarantee: 'Garantia 24H: No ar em 24h ou 50% de desconto',
      metrics: {
        speed: 'Entrega Rápida 24h',
        projects: '+380 Sites Criados',
        satisfaction: '99.4% Satisfação',
        conversion: '3.4x Mais Conversão',
      }
    },
    services: {
      title: 'Soluções Web de Alta Performance',
      subtitle: 'Descubra nossos pacotes criados para acelerar seu negócio desde o primeiro dia.',
      rush24hTag: 'Entrega em 24 Horas',
      viewDetails: 'Detalhes do Pacote',
      bookNow: 'Orçar e Reservar',
      includedTitle: 'Incluído no seu projeto:',
      techStackTitle: 'Tecnologias e Padrões:',
    },
    quoteModal: {
      title: 'Orçador Inteligente & Reservas',
      step1: '1. Selecione o Serviço & Extras',
      step2: '2. Prazo de Entrega',
      step3: '3. Data & Horário de Kickoff',
      step4: '4. Dados com Criptografia E2EE',
      step5: '5. Pagamento Seguro & Confirmação',
      next: 'Próximo Passo',
      back: 'Voltar',
      confirmBooking: 'Confirmar Reserva e Criptografar',
      successTitle: 'Solicitação Criada com Sucesso!',
      successSub: 'Ticket gerado e equipe notificada em tempo real.',
    },
    admin: {
      title: 'Painel Administrativo em Tempo Real',
      subtitle: 'Controle de solicitações, clientes, estatísticas e criptografia ponta a ponta.',
      tabBookings: 'Reservas ao Vivo',
      tabAnalytics: 'Vendas Diárias',
      tabClients: 'Histórico de Clientes',
      tabTeam: 'Cargos & Permissões',
      tabSecurity: 'Cofre Criptográfico',
      tabIntegrations: 'Gateways e Redes',
      simulateNewBooking: '⚡ Simular Nova Reserva ao Vivo',
      filterAll: 'Todas as Solicitações',
      filterPending: 'Pendentes',
      filterInDev: 'Em Desenvolvimento 24h',
      filterCompleted: 'Finalizadas',
      markStatus: 'Atualizar Status',
      assignStaff: 'Atribuir Responsável',
      clientHistory: 'Histórico do Cliente',
      totalRevenue: 'Faturamento Total',
      dailySales: 'Vendas de Hoje',
      conversionRate: 'Taxa de Conversão',
      activeRequests: 'Solicitações Ativas',
    },
    security: {
      badge: 'Criptografia de Ponta a Ponta Ativa (E2EE)',
      desc: 'Dados protegidos com chaves criptográficas AES-GCM 256 bits e assinatura SHA-256.',
      verified: 'Integridade Criptográfica Verificada',
    }
  }
};
