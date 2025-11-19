import { AppTemplate, HostingPlan, PlanType } from './types';

export const APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'wp-latest',
    name: 'WordPress',
    description: 'The world\'s most popular CMS. Pre-configured with MySQL.',
    category: 'CMS',
    icon: 'LayoutTemplate',
    image: 'wordpress:latest',
    recommendedPlan: 'plan_wp',
    minPort: 80,
    envVars: ['WORDPRESS_DB_HOST', 'WORDPRESS_DB_PASSWORD']
  },
  {
    id: 'ghost-blog',
    name: 'Ghost Blog',
    description: 'Professional publishing platform for modern journalism.',
    category: 'CMS',
    icon: 'Feather',
    image: 'ghost:5-alpine',
    recommendedPlan: 'plan_node',
    minPort: 2368,
    envVars: ['url', 'database__client']
  },
  {
    id: 'node-stack',
    name: 'Node.js Starter',
    description: 'Empty Node.js container with Express pre-installed.',
    category: 'Runtime',
    icon: 'Code2',
    image: 'node:20-alpine',
    recommendedPlan: 'plan_node',
    minPort: 3000,
    envVars: ['NODE_ENV']
  },
  {
    id: 'postgres-db',
    name: 'PostgreSQL',
    description: 'Advanced open source relational database.',
    category: 'Database',
    icon: 'Database',
    image: 'postgres:16',
    recommendedPlan: 'plan_stack',
    minPort: 5432,
    envVars: ['POSTGRES_PASSWORD']
  }
];

export const HOSTING_PLANS: HostingPlan[] = [
  {
    id: 'plan_wp',
    name: 'Starter Container',
    price: 5,
    cpu: '1 vCore',
    ram: '512MB RAM',
    storage: '10GB NVMe',
    type: PlanType.STARTER,
    features: ['Docker Isolation', 'Cloudflare Tunnel', 'Auto-Updates', 'Weekly Backups']
  },
  {
    id: 'plan_node',
    name: 'Pro Container',
    price: 12,
    cpu: '2 vCore',
    ram: '2GB RAM',
    storage: '25GB NVMe',
    type: PlanType.PRO,
    features: ['Custom Dockerfile', 'Zero Trust Access', 'Real-time Logs', 'CI/CD Webhook', 'DB Container Included']
  },
  {
    id: 'plan_stack',
    name: 'Business Cluster',
    price: 30,
    cpu: '4 vCore',
    ram: '8GB RAM',
    storage: '100GB NVMe',
    type: PlanType.BUSINESS,
    features: ['Docker Compose Support', 'Dedicated Redis', 'Load Balancing', 'Priority Support', 'Unlimited Bandwidth']
  }
];

export const MOCK_LOGS = [
  "Authenticating with Host (Ubuntu 24.04 LTS)...",
  "Validating Cloudflare API Token...",
  "Cloudflare API: Connection OK (Zone: {domain})",
  "Allocating isolated namespace...",
  "Executing: docker pull {image}...",
  "Creating docker network bridge...",
  "Mounting volume: /var/lib/docker/volumes/{id}/_data...",
  "Starting container...",
  "Container ID: {container_id} generated.",
  "Health check passed: Container Running on port {port}.",
  "Initializing Cloudflare Tunnel...",
  "API CALL: POST /zones/{zone_id}/dns_records (Type: CNAME, Name: {subdomain})",
  "API RESPONSE: 200 OK (Record ID: {record_id})",
  "Routing traffic: {subdomain}.{base_domain} -> localhost:{port}",
  "SSL Certificate Provisioned (Edge Certificate).",
  "Service Ready."
];

export const MOCK_USERS = [
  { id: 'u1', name: 'Alice Engineer', email: 'alice@dev.io', status: 'active', servicesCount: 2, joinedDate: '2023-11-01' },
  { id: 'u2', name: 'Bob Agency', email: 'bob@agency.com', status: 'active', servicesCount: 5, joinedDate: '2023-12-15' },
  { id: 'u3', name: 'Charlie Student', email: 'charlie@edu.com', status: 'suspended', servicesCount: 1, joinedDate: '2024-01-20' },
];

export const MOCK_INVOICES = [
  { id: 'inv_001', amount: 12.00, status: 'paid', date: '2024-02-01', serviceId: 'srv_a1' },
  { id: 'inv_002', amount: 30.00, status: 'unpaid', date: '2024-02-01', serviceId: 'srv_b2' },
];

export const MOCK_ADMIN_STATS = {
  cpuLoad: 45,
  memoryUsage: 62,
  diskUsage: 28,
  activeTunnels: 8,
  totalRevenue: 1250.00
};