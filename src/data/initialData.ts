import { ServiceProduct, BookingRequest, ClientProfile, TeamMember, DailySalesStat, PushNotification } from '../types';

export const INITIAL_SERVICES: ServiceProduct[] = [
  {
    id: 'landing-24h',
    title: 'Landing Page Express 24H',
    subtitle: 'Tu página web lista para vender en menos de 24 horas garantizado.',
    shortDesc: 'Diseño personalizado de una sola página ultra optimizado para captar clientes por WhatsApp y formularios.',
    detailedDesc: 'El servicio insignia de FORJA WEBS. Si necesitas estar en internet de inmediato con calidad premium de agencia, creamos tu landing page en tiempo récord (24 horas). Incluye diseño adaptado a tu identidad, maquetación responsive para móviles, botón directo a WhatsApp con mensaje personalizado, hosting ultra-rápido en CDN y certificado SSL de por vida.',
    priceUSD: 59,
    deliveryHours: 24,
    category: 'landing',
    popular: true,
    badge: '¡EN 24 HORAS!',
    features: [
      'Entrega garantizada en 24 horas',
      'Diseño 100% personalizado (sin plantillas genéricas)',
      '100% adaptable a celulares, tablets y computadores',
      'Botón flotante inteligente a WhatsApp',
      'Formulario de contacto con alertas al correo',
      'Dominio .com + Hosting SSL Cloud primer año gratis',
      'Optimización SEO base para Google',
      'Puntuación Google PageSpeed 95+'
    ],
    includedSpecs: {
      responsive: true,
      seoOptimized: true,
      deliveryTime: '24 Horas',
      hostingIncluded: '1 Año CDN Cloud',
      customDomain: true,
      whatsappButton: true,
      adminPanel: false,
      securitySSL: true,
      revisionRounds: 2
    },
    techStack: ['Vite / React', 'Tailwind CSS', 'Cloudflare CDN', 'SEO Schema.org'],
    mockupType: 'landing'
  },
  {
    id: 'redesign-speed',
    title: 'Rediseño & Optimización 24H',
    subtitle: 'Moderniza tu sitio web antiguo y dispara su velocidad en menos de un día.',
    shortDesc: 'Transformamos tu web obsoleta en una máquina de ventas moderna, rápida y con diseño impactante.',
    detailedDesc: '¿Tu web actual carga lento, luce antigua o no se ve bien en teléfonos? Nuestro equipo reescribe la arquitectura visual y técnica en 24 horas: diseño 2026 de alta gama, velocidad de carga menor a 1 segundo y retención de todo tu contenido previo sin perder tu posicionamiento.',
    priceUSD: 69,
    deliveryHours: 24,
    category: 'redesign',
    popular: false,
    badge: 'RENOVACIÓN 24H',
    features: [
      'Rediseño visual completo con estética moderna 2026',
      'Optimización extrema de velocidad (Core Web Vitals)',
      'Adaptación perfecta a pantallas móviles',
      'Migración de contenido sin caída de servicio (Zero Downtime)',
      'Certificados de seguridad actualizados',
      'Auditoría SEO completa y corrección de enlaces rotos'
    ],
    includedSpecs: {
      responsive: true,
      seoOptimized: true,
      deliveryTime: '24 Horas',
      hostingIncluded: 'Migración Cloud incluida',
      customDomain: true,
      whatsappButton: true,
      adminPanel: false,
      securitySSL: true,
      revisionRounds: 2
    },
    techStack: ['Vite', 'Tailwind CSS', 'Asset Optimization', 'Lighthouse 100'],
    mockupType: 'redesign'
  },
  {
    id: 'corporate-pyme',
    title: 'Web Corporativa & Pyme',
    subtitle: 'La carta de presentación digital definitiva para empresas y profesionales.',
    shortDesc: 'Sitio web multi-página (Inicio, Nosotros, Servicios, Blog, Contacto y Sistema de Reservas).',
    detailedDesc: 'Diseñado específicamente para empresas, consultoras, clínicas y marcas que requieren transmitir máxima confianza y autoridad. Integra un sistema de reservas de citas con calendario sincronizado, sección de servicios interactiva, testimonios, blog para posicionamiento orgánico en Google y correos corporativos configurados.',
    priceUSD: 89,
    deliveryHours: 48,
    category: 'corporate',
    popular: false,
    badge: 'AUTORIDAD EMPRESARIAL',
    features: [
      'Hasta 6 páginas interiores personalizadas',
      'Sistema de agendamiento de citas y reservas en vivo',
      'Hasta 5 cuentas de correo corporativo profesional (@tuempresa.com)',
      'Blog integrado para artículos y SEO avanzado',
      'Integración con CRM y Google Analytics 4',
      'Diseño UX/UI enfocado en captación B2B',
      'Soporte técnico prioritario por 6 meses'
    ],
    includedSpecs: {
      responsive: true,
      seoOptimized: true,
      deliveryTime: '48 Horas',
      hostingIncluded: '1 Año Premium NVMe',
      customDomain: true,
      whatsappButton: true,
      adminPanel: true,
      securitySSL: true,
      revisionRounds: 3
    },
    techStack: ['React SPA', 'Tailwind CSS', 'Google Calendar API', 'E2EE Contact'],
    mockupType: 'saas'
  },
  {
    id: 'ecommerce-pro',
    title: 'E-Commerce & Tienda Online Pro',
    subtitle: 'Vende tus productos 24/7 con pasarela de pagos y control total de inventario.',
    shortDesc: 'Tienda virtual moderna con pasarelas de pago directas (Stripe, PayPal, MercadoPago/Wompi), catálogo autogestionable y carrito.',
    detailedDesc: 'Convierte visitantes en clientes recurrentes. Tu tienda online incluye carrito de compra dinámico, cálculo de envíos, gestión de productos con variantes (tallas, colores), pasarelas de pago directo para tarjetas y transferencias, y panel intuitivo para monitorear pedidos y facturación en tiempo real.',
    priceUSD: 109,
    deliveryHours: 72,
    category: 'ecommerce',
    popular: false,
    badge: 'MÁS VENDIDO',
    features: [
      'Catálogo ilimitado de productos y categorías',
      'Pasarela de pago Stripe, PayPal y Mercado Pago integrada',
      'Carrito de compras dinámico y checkout seguro SSL',
      'Gestión automática de stock y notificaciones de ventas',
      'Integración con WhatsApp para pedidos rápidos',
      'Cuentas de clientes con historial de compras',
      'Capacitación en video para administrar la tienda'
    ],
    includedSpecs: {
      responsive: true,
      seoOptimized: true,
      deliveryTime: '48 - 72 Horas',
      hostingIncluded: '1 Año Cloud dedicado',
      customDomain: true,
      whatsappButton: true,
      adminPanel: true,
      securitySSL: true,
      revisionRounds: 3
    },
    techStack: ['React / Next.js', 'Stripe API', 'PostgreSQL / Cloud SQL', 'Tailwind CSS'],
    mockupType: 'ecommerce'
  },
  {
    id: 'custom-webapp',
    title: 'Aplicación Web a Medida & SaaS',
    subtitle: 'Plataforma web con base de datos, login de usuarios y panel administrativo.',
    shortDesc: 'Software web personalizado con roles de usuario, base de datos centralizada, APIs y reportes.',
    detailedDesc: 'Desarrollamos soluciones a la medida para digitalizar las operaciones de tu negocio: portales de clientes, software de cotizaciones interno, paneles SaaS por suscripción o intranets. Con arquitectura moderna, base de datos relacional protegida con cifrado de datos y experiencia de usuario fluida.',
    priceUSD: 129,
    deliveryHours: 120,
    category: 'custom_app',
    popular: false,
    badge: 'ALTA ESCALABILIDAD',
    features: [
      'Panel administrativo centralizado con analíticas avanzadas',
      'Sistema de usuarios con roles y permisos específicos',
      'Base de datos estructurada con respaldo automático',
      'Cifrado de datos de extremo a extremo (E2EE) en reposo y tránsito',
      'Exportación de reportes en PDF y Excel/CSV',
      'Notificaciones push en tiempo real a clientes y administradores',
      'Integración con pasarelas de pago y webhooks'
    ],
    includedSpecs: {
      responsive: true,
      seoOptimized: true,
      deliveryTime: '5 Días Laborales',
      hostingIncluded: 'Arquitectura Cloud Serverless',
      customDomain: true,
      whatsappButton: true,
      adminPanel: true,
      securitySSL: true,
      revisionRounds: 5
    },
    techStack: ['Fullstack TypeScript', 'PostgreSQL', 'AES-GCM Web Crypto', 'WebSockets'],
    mockupType: 'saas'
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'FW-2026-1082',
    clientName: 'Carlos Mario Restrepo',
    clientEmail: 'carlos.restrepo@inversionesandina.com',
    clientPhone: '+57 312 849 2011',
    companyName: 'Inversiones Andina SAS',
    serviceId: 'landing-24h',
    serviceName: 'Landing Page Express 24H',
    deliverySpeed: '24h',
    targetDate: '2026-10-19',
    targetTime: '10:00 AM',
    selectedAddons: ['Pasarela Stripe / Tarjetas', 'Botón WhatsApp Pro'],
    estimatedTotalUSD: 77,
    currency: 'USD',
    status: 'in_development',
    paymentStatus: 'deposit_paid',
    paymentGateway: 'stripe',
    assignedStaffId: 'dev-1',
    projectNotes: 'Campaña de lanzamiento inmobiliario en Medellín. Entrega urgente comprometida en 24h. Paleta azul navy y dorado.',
    createdAt: '2026-10-18T14:30:00Z',
    updatedAt: '2026-10-18T16:00:00Z',
    encryptedDataHash: '7f9c2d1b8e4a5f36e091b2c4d8e7a6b5c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8',
    encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
    isEncrypted: true,
    meetingLink: 'https://meet.google.com/fw-andina-kickoff',
    invoiceNumber: 'INV-2026-0891'
  },
  {
    id: 'FW-2026-1081',
    clientName: 'Dra. Valentina Morales',
    clientEmail: 'contacto@dentalvalencia.co',
    clientPhone: '+57 300 451 9822',
    companyName: 'Clínica Dental Valencia',
    serviceId: 'corporate-pyme',
    serviceName: 'Web Corporativa & Pyme',
    deliverySpeed: 'express_3d',
    targetDate: '2026-10-20',
    targetTime: '03:30 PM',
    selectedAddons: ['Sistema de Citas Online', 'Integración WhatsApp CRM'],
    estimatedTotalUSD: 107,
    currency: 'USD',
    status: 'approved',
    paymentStatus: 'full_paid',
    paymentGateway: 'mercadopago',
    assignedStaffId: 'pm-1',
    projectNotes: 'Incluir calendario de agendamiento para valoración odontológica y catálogo de tratamientos estéticos.',
    createdAt: '2026-10-18T09:15:00Z',
    updatedAt: '2026-10-18T11:20:00Z',
    encryptedDataHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
    isEncrypted: true,
    meetingLink: 'https://meet.google.com/fw-dental-review',
    invoiceNumber: 'INV-2026-0890'
  },
  {
    id: 'FW-2026-1080',
    clientName: 'Santiago Gómez',
    clientEmail: 'santiago@barberkulture.com',
    clientPhone: '+57 318 902 3311',
    companyName: 'Kulture Barber Shop',
    serviceId: 'landing-24h',
    serviceName: 'Landing Page Express 24H',
    deliverySpeed: '24h',
    targetDate: '2026-10-18',
    targetTime: '08:00 AM',
    selectedAddons: ['Catálogo de Servicios', 'Google Maps Local'],
    estimatedTotalUSD: 59,
    currency: 'USD',
    status: 'completed',
    paymentStatus: 'full_paid',
    paymentGateway: 'pse_wire',
    assignedStaffId: 'dev-1',
    projectNotes: 'Entregado a satisfacción en exactamente 19 horas. Dominio configurado y certificado SSL activo.',
    createdAt: '2026-10-17T11:00:00Z',
    updatedAt: '2026-10-18T06:30:00Z',
    encryptedDataHash: '1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
    isEncrypted: true,
    meetingLink: 'https://meet.google.com/fw-kulture-handoff',
    invoiceNumber: 'INV-2026-0889'
  },
  {
    id: 'FW-2026-1079',
    clientName: 'Mariana Silva',
    clientEmail: 'mariana.silva@modavelvet.com',
    clientPhone: '+55 11 98421-9980',
    companyName: 'Velvet Moda & Calzado',
    serviceId: 'ecommerce-pro',
    serviceName: 'E-Commerce & Tienda Online Pro',
    deliverySpeed: 'express_3d',
    targetDate: '2026-10-21',
    targetTime: '11:00 AM',
    selectedAddons: ['Pasarela PayPal Internacional', 'Notificaciones SMS / WhatsApp'],
    estimatedTotalUSD: 124,
    currency: 'USD',
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentGateway: 'paypal',
    assignedStaffId: 'sales-1',
    projectNotes: 'Cliente solicita cotización formal con pasarela internacional para envíos a Colombia, México y Brasil.',
    createdAt: '2026-10-18T18:40:00Z',
    updatedAt: '2026-10-18T18:40:00Z',
    encryptedDataHash: '4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
    encryptionAlgorithm: 'AES-GCM-256 + SHA-256',
    isEncrypted: true,
    meetingLink: 'https://meet.google.com/fw-velvet-demo',
    invoiceNumber: 'INV-2026-0892'
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-001',
    name: 'Carlos Mario Restrepo',
    email: 'carlos.restrepo@inversionesandina.com',
    phone: '+57 312 849 2011',
    company: 'Inversiones Andina SAS',
    country: 'Colombia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalSpentUSD: 77,
    bookingsCount: 1,
    firstContactDate: '2026-10-18',
    lastActiveDate: '2026-10-18',
    status: 'active',
    tags: ['Inmobiliario', 'Rush 24h', 'Stripe'],
    internalNotes: [
      {
        id: 'note-1',
        date: '2026-10-18 15:00',
        author: 'Alejandro Echeverry',
        text: 'Cliente muy puntual. Requiere entrega en 24h para pauta en Meta Ads.'
      }
    ],
    associatedBookingIds: ['FW-2026-1082']
  },
  {
    id: 'cli-002',
    name: 'Dra. Valentina Morales',
    email: 'contacto@dentalvalencia.co',
    phone: '+57 300 451 9822',
    company: 'Clínica Dental Valencia',
    country: 'Colombia',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    totalSpentUSD: 107,
    bookingsCount: 1,
    firstContactDate: '2026-10-18',
    lastActiveDate: '2026-10-18',
    status: 'vip',
    tags: ['Salud', 'Corporativo', 'MercadoPago'],
    internalNotes: [
      {
        id: 'note-2',
        date: '2026-10-18 11:00',
        author: 'Laura Mendoza',
        text: 'Pago completo recibido. Citas integradas con Google Calendar.'
      }
    ],
    associatedBookingIds: ['FW-2026-1081']
  },
  {
    id: 'cli-003',
    name: 'Santiago Gómez',
    email: 'santiago@barberkulture.com',
    phone: '+57 318 902 3311',
    company: 'Kulture Barber Shop',
    country: 'Colombia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    totalSpentUSD: 59,
    bookingsCount: 1,
    firstContactDate: '2026-10-17',
    lastActiveDate: '2026-10-18',
    status: 'active',
    tags: ['Retail', '24H Exitosa', 'PSE'],
    internalNotes: [
      {
        id: 'note-3',
        date: '2026-10-18 07:00',
        author: 'Dev Lead Forja',
        text: 'Sitio entregado en 19 horas. Calificación de 5 estrellas en reseña.'
      }
    ],
    associatedBookingIds: ['FW-2026-1080']
  },
  {
    id: 'cli-004',
    name: 'Mariana Silva',
    email: 'mariana.silva@modavelvet.com',
    phone: '+55 11 98421-9980',
    company: 'Velvet Moda & Calzado',
    country: 'Brasil / LATAM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    totalSpentUSD: 0,
    bookingsCount: 1,
    firstContactDate: '2026-10-18',
    lastActiveDate: '2026-10-18',
    status: 'lead',
    tags: ['E-Commerce', 'Internacional', 'Seguimiento'],
    internalNotes: [
      {
        id: 'note-4',
        date: '2026-10-18 19:00',
        author: 'Asesor Comercial',
        text: 'Enviada propuesta personalizada por WhatsApp. Pendiente confirmación de pago.'
      }
    ],
    associatedBookingIds: ['FW-2026-1079']
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'super-admin-1',
    name: 'Alejandro Echeverry',
    email: 'Alejoecheverry4529@gmail.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Dirección General & Operaciones',
    active: true,
    permissions: {
      canManageBookings: true,
      canViewFinancials: true,
      canEditClients: true,
      canManageTeam: true,
      canAccessEncryptionKeys: true,
      canExportReports: true
    }
  },
  {
    id: 'admin-1',
    name: 'Laura Mendoza',
    email: 'laura@forjawebs.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Gestión de Proyectos & QA',
    active: true,
    permissions: {
      canManageBookings: true,
      canViewFinancials: true,
      canEditClients: true,
      canManageTeam: false,
      canAccessEncryptionKeys: true,
      canExportReports: true
    }
  },
  {
    id: 'dev-1',
    name: 'Mateo Cárdenas',
    email: 'mateo@forjawebs.com',
    role: 'developer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'Ingeniería Rápida 24H',
    active: true,
    permissions: {
      canManageBookings: true,
      canViewFinancials: false,
      canEditClients: false,
      canManageTeam: false,
      canAccessEncryptionKeys: false,
      canExportReports: false
    }
  },
  {
    id: 'sales-1',
    name: 'Camila Suárez',
    email: 'camila@forjawebs.com',
    role: 'commercial',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Ventas & Cierre Comercial',
    active: true,
    permissions: {
      canManageBookings: true,
      canViewFinancials: false,
      canEditClients: true,
      canManageTeam: false,
      canAccessEncryptionKeys: false,
      canExportReports: true
    }
  }
];

export const INITIAL_DAILY_STATS: DailySalesStat[] = [
  { date: '2026-10-05', dayLabel: '05 Oct', revenueUSD: 140, bookingsCount: 2, completedProjects: 2, leadsCount: 5 },
  { date: '2026-10-06', dayLabel: '06 Oct', revenueUSD: 195, bookingsCount: 3, completedProjects: 3, leadsCount: 7 },
  { date: '2026-10-07', dayLabel: '07 Oct', revenueUSD: 230, bookingsCount: 3, completedProjects: 2, leadsCount: 8 },
  { date: '2026-10-08', dayLabel: '08 Oct', revenueUSD: 175, bookingsCount: 2, completedProjects: 2, leadsCount: 6 },
  { date: '2026-10-09', dayLabel: '09 Oct', revenueUSD: 310, bookingsCount: 4, completedProjects: 4, leadsCount: 11 },
  { date: '2026-10-10', dayLabel: '10 Oct', revenueUSD: 250, bookingsCount: 3, completedProjects: 2, leadsCount: 9 },
  { date: '2026-10-11', dayLabel: '11 Oct', revenueUSD: 210, bookingsCount: 3, completedProjects: 3, leadsCount: 7 },
  { date: '2026-10-12', dayLabel: '12 Oct', revenueUSD: 260, bookingsCount: 3, completedProjects: 3, leadsCount: 8 },
  { date: '2026-10-13', dayLabel: '13 Oct', revenueUSD: 390, bookingsCount: 5, completedProjects: 4, leadsCount: 14 },
  { date: '2026-10-14', dayLabel: '14 Oct', revenueUSD: 320, bookingsCount: 4, completedProjects: 4, leadsCount: 12 },
  { date: '2026-10-15', dayLabel: '15 Oct', revenueUSD: 440, bookingsCount: 5, completedProjects: 5, leadsCount: 15 },
  { date: '2026-10-16', dayLabel: '16 Oct', revenueUSD: 510, bookingsCount: 6, completedProjects: 5, leadsCount: 18 },
  { date: '2026-10-17', dayLabel: '17 Oct', revenueUSD: 460, bookingsCount: 5, completedProjects: 5, leadsCount: 16 },
  { date: '2026-10-18', dayLabel: 'Hoy', revenueUSD: 367, bookingsCount: 4, completedProjects: 3, leadsCount: 13 }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: '⚡ Nueva Reserva 24H Recibida',
    message: 'Carlos Restrepo reservó "Landing Page Express 24H" ($77 USD). Prioridad Alta.',
    timestamp: 'Hace 5 minutos',
    type: 'booking',
    read: false,
    bookingId: 'FW-2026-1082'
  },
  {
    id: 'notif-2',
    title: '💳 Pago Confirmado vía MercadoPago',
    message: 'Dra. Valentina Morales completó el pago del proyecto Web Corporativa ($107 USD).',
    timestamp: 'Hace 2 horas',
    type: 'payment',
    read: false,
    bookingId: 'FW-2026-1081'
  },
  {
    id: 'notif-3',
    title: '🔒 Clave Criptográfica E2EE Verificada',
    message: 'Payload de cliente verificado con algoritmo SHA-256 e integridad intacta.',
    timestamp: 'Hace 4 horas',
    type: 'security',
    read: true
  },
  {
    id: 'notif-4',
    title: '🚀 Proyecto Entregado en 19 Horas',
    message: 'Sitio "Kulture Barber Shop" finalizado 5 horas antes del SLA de 24 horas.',
    timestamp: 'Ayer',
    type: 'sla',
    read: true,
    bookingId: 'FW-2026-1080'
  }
];
