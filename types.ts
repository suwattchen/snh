export enum PlanType {
  STARTER = 'Starter',
  PRO = 'Pro',
  BUSINESS = 'Business'
}

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: 'CMS' | 'Database' | 'Runtime' | 'Game';
  icon: string; // Lucide icon name
  image: string; // Docker image
  recommendedPlan: string;
  minPort: number;
  envVars: string[]; // Required env vars
}

export interface HostingPlan {
  id: string;
  name: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  features: string[];
  type: PlanType;
}

export enum ServiceStatus {
  PENDING = 'Pending',
  PROVISIONING = 'Provisioning',
  ACTIVE = 'Active',
  STOPPED = 'Stopped',
  ERROR = 'Error'
}

export interface Service {
  id: string;
  domain: string;
  planId: string;
  appTemplateId: string;
  status: ServiceStatus;
  ipAddress: string;
  containerId: string;
  portMapping: string;
  publicUrl: string;
  image: string;
  created_at: string;
  diskUsage: number;
  bandwidthUsage: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  servicesCount: number;
  joinedDate: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  date: string;
  serviceId: string;
}

export interface CloudflareConfig {
  apiToken: string;
  zoneId: string;
  baseDomain: string;
  tunnelId: string;
  isConfigured: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'Answered' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  lastUpdate: string;
}