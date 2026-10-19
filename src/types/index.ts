export type Language = 'es' | 'en' | 'pt';

export type Currency = 'USD' | 'COP' | 'EUR' | 'MXN';

export interface ServiceProduct {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  detailedDesc: string;
  priceUSD: number;
  deliveryHours: number; // e.g. 24 for 24 hours
  category: 'landing' | 'ecommerce' | 'corporate' | 'custom_app' | 'redesign';
  features: string[];
  includedSpecs: {
    responsive: boolean;
    seoOptimized: boolean;
    deliveryTime: string;
    hostingIncluded: string;
    customDomain: boolean;
    whatsappButton: boolean;
    adminPanel: boolean;
    securitySSL: boolean;
    revisionRounds: number;
  };
  popular?: boolean;
  badge?: string;
  techStack: string[];
  mockupType: 'landing' | 'ecommerce' | 'saas' | 'redesign';
}

export type DeliverySpeed = '24h' | 'express_3d' | 'standard_7d';

export type BookingStatus = 
  | 'pending'
  | 'in_review'
  | 'in_development'
  | 'approved'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'full_paid';

export type PaymentGateway = 'stripe' | 'paypal' | 'mercadopago' | 'pse_wire' | 'crypto';

export interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  serviceId: string;
  serviceName: string;
  deliverySpeed: DeliverySpeed;
  targetDate: string;
  targetTime: string;
  selectedAddons: string[];
  estimatedTotalUSD: number;
  currency: Currency;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentGateway?: PaymentGateway;
  assignedStaffId?: string;
  projectNotes: string;
  createdAt: string;
  updatedAt: string;
  // End-to-end encryption metadata
  encryptedDataHash: string;
  encryptionAlgorithm: string;
  isEncrypted: boolean;
  meetingLink?: string;
  invoiceNumber?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  avatar: string;
  totalSpentUSD: number;
  bookingsCount: number;
  firstContactDate: string;
  lastActiveDate: string;
  status: 'lead' | 'active' | 'vip' | 'inactive';
  tags: string[];
  internalNotes: {
    id: string;
    date: string;
    author: string;
    text: string;
  }[];
  associatedBookingIds: string[];
}

export type UserRole = 'super_admin' | 'admin' | 'commercial' | 'developer' | 'client';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  active: boolean;
  permissions: {
    canManageBookings: boolean;
    canViewFinancials: boolean;
    canEditClients: boolean;
    canManageTeam: boolean;
    canAccessEncryptionKeys: boolean;
    canExportReports: boolean;
  };
}

export interface DailySalesStat {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  revenueUSD: number;
  bookingsCount: number;
  completedProjects: number;
  leadsCount: number;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'booking' | 'payment' | 'security' | 'system' | 'sla';
  read: boolean;
  bookingId?: string;
  actionUrl?: string;
}

export interface SecurityEncryptionLog {
  id: string;
  timestamp: string;
  action: 'KEY_GENERATED' | 'PAYLOAD_ENCRYPTED' | 'HASH_VERIFIED' | 'ACCESS_GRANTED';
  recordId: string;
  algorithm: string;
  hash: string;
  details: string;
}
